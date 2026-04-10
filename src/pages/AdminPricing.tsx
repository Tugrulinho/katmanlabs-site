import { useState } from 'react';
import { Save, RefreshCw, CheckCircle, XCircle, Plus, Minus, Star } from 'lucide-react';
import { usePricingCards, PricingCard } from '../hooks/usePricingCards';

export default function AdminPricing() {
  const { packages, loading, error, updatePackage, refetch } = usePricingCards();
  const [editedPackages, setEditedPackages] = useState<Record<string, Partial<PricingCard>>>({});
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const handleFieldChange = (id: string, field: keyof PricingCard, value: any) => {
    setEditedPackages((prev) => ({
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
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;

    const currentFeatures = editedPackages[id]?.features || pkg.features;
    const newFeatures = [...currentFeatures];
    newFeatures[index] = value;

    handleFieldChange(id, 'features', newFeatures);
  };

  const addFeature = (id: string) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;

    const currentFeatures = editedPackages[id]?.features || pkg.features;
    handleFieldChange(id, 'features', [...currentFeatures, '']);
  };

  const removeFeature = (id: string, index: number) => {
    const pkg = packages.find((p) => p.id === id);
    if (!pkg) return;

    const currentFeatures = editedPackages[id]?.features || pkg.features;
    const newFeatures = currentFeatures.filter((_, i) => i !== index);
    handleFieldChange(id, 'features', newFeatures);
  };

  const handleSave = async (id: string) => {
    const updates = editedPackages[id];
    if (!updates) return;

    setSavingIds((prev) => new Set(prev).add(id));
    const result = await updatePackage(id, updates);
    setSavingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    if (result.success) {
      setSavedIds((prev) => new Set(prev).add(id));
      setEditedPackages((prev) => {
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

  const getValue = (pkg: PricingCard, field: keyof PricingCard) => {
    return editedPackages[pkg.id]?.[field] ?? pkg[field];
  };

  const hasChanges = (id: string) => {
    return !!editedPackages[id];
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
          <span>Fiyat kartlari yuklenirken hata olustu: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fiyat Kartlari</h1>
          <p className="text-gray-600 mt-1">
            Paket iceriklerini ve siralamalarini buradan guncelleyebilirsin.
          </p>
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Yenile
        </button>
      </div>

      <div className="space-y-6">
        {packages.map((pkg) => {
          const isSaving = savingIds.has(pkg.id);
          const isSaved = savedIds.has(pkg.id);
          const hasChanged = hasChanges(pkg.id);
          const features = getValue(pkg, 'features') as string[];

          return (
            <div key={pkg.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-900">{pkg.name}</h2>
                  {pkg.popular && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Populer
                    </span>
                  )}
                  {isSaved && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Kaydedildi
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleSave(pkg.id)}
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
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Kaydet
                    </>
                  )}
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Paket Adi</label>
                  <input
                    type="text"
                    value={getValue(pkg, 'name') as string}
                    onChange={(e) => handleFieldChange(pkg.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Fiyat</label>
                    <input
                      type="text"
                      value={getValue(pkg, 'price') as string}
                      onChange={(e) => handleFieldChange(pkg.id, 'price', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ornek: 5.000 TL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Donem</label>
                    <input
                      type="text"
                      value={getValue(pkg, 'period') as string}
                      onChange={(e) => handleFieldChange(pkg.id, 'period', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ornek: aylik"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-900">Ozellikler</label>
                    <button
                      onClick={() => addFeature(pkg.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Ozellik Ekle
                    </button>
                  </div>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(pkg.id, index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Ozellik ${index + 1}`}
                        />
                        <button
                          onClick={() => removeFeature(pkg.id, index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Gosterim Sirasi</label>
                  <input
                    type="number"
                    value={getValue(pkg, 'display_order') as number}
                    onChange={(e) => handleFieldChange(pkg.id, 'display_order', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={getValue(pkg, 'popular') as boolean}
                      onChange={(e) => handleFieldChange(pkg.id, 'popular', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">One Cikan Paket</span>
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
