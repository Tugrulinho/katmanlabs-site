import { useState } from 'react';
import { Save, RefreshCw, CheckCircle, XCircle, Plus, Minus, Star } from 'lucide-react';
import { useServiceCards, ServiceCard } from '../hooks/useServiceCards';

export default function AdminServices() {
  const { services, loading, error, updateService, refetch } = useServiceCards();
  const [editedServices, setEditedServices] = useState<Record<string, Partial<ServiceCard>>>({});
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const handleFieldChange = (id: string, field: keyof ServiceCard, value: any) => {
    setEditedServices((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
    setSavedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleFeatureChange = (id: string, index: number, value: string) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    const currentFeatures = editedServices[id]?.features || service.features;
    const newFeatures = [...currentFeatures];
    newFeatures[index] = value;

    handleFieldChange(id, 'features', newFeatures);
  };

  const addFeature = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    const currentFeatures = editedServices[id]?.features || service.features;
    handleFieldChange(id, 'features', [...currentFeatures, '']);
  };

  const removeFeature = (id: string, index: number) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    const currentFeatures = editedServices[id]?.features || service.features;
    const newFeatures = currentFeatures.filter((_, i) => i !== index);
    handleFieldChange(id, 'features', newFeatures);
  };

  const handleSave = async (id: string) => {
    const updates = editedServices[id];
    if (!updates) return;

    setSavingIds((prev) => new Set(prev).add(id));
    const result = await updateService(id, updates);
    setSavingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    if (result.success) {
      setSavedIds((prev) => new Set(prev).add(id));
      setEditedServices((prev) => {
        const newEdited = { ...prev };
        delete newEdited[id];
        return newEdited;
      });
      setTimeout(() => {
        setSavedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 3000);
    }
  };

  const getValue = (service: ServiceCard, field: keyof ServiceCard) => {
    return editedServices[service.id]?.[field] ?? service[field];
  };

  const hasChanges = (id: string) => {
    return !!editedServices[id];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-800">
          <XCircle className="w-5 h-5" />
          <span>Error loading services: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Cards Management</h1>
          <p className="text-gray-600 mt-1">Edit service card text content</p>
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="space-y-6">
        {services.map((service) => {
          const isSaving = savingIds.has(service.id);
          const isSaved = savedIds.has(service.id);
          const hasChanged = hasChanges(service.id);
          const features = getValue(service, 'features') as string[];

          return (
            <div key={service.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">{service.title}</h2>
                  {service.featured && (
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  {isSaved && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Saved
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleSave(service.id)}
                  disabled={!hasChanged || isSaving}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    hasChanged && !isSaving
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
                  <input
                    type="text"
                    value={getValue(service, 'title') as string}
                    onChange={(e) => handleFieldChange(service.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <textarea
                    value={getValue(service, 'description') as string}
                    onChange={(e) => handleFieldChange(service.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-900">Features</label>
                    <button
                      onClick={() => addFeature(service.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(service.id, index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Feature ${index + 1}`}
                        />
                        <button
                          onClick={() => removeFeature(service.id, index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Slug</label>
                    <input
                      type="text"
                      value={getValue(service, 'slug') as string}
                      onChange={(e) => handleFieldChange(service.id, 'slug', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={getValue(service, 'display_order') as number}
                      onChange={(e) => handleFieldChange(service.id, 'display_order', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={getValue(service, 'featured') as boolean}
                      onChange={(e) => handleFieldChange(service.id, 'featured', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured Card</span>
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
