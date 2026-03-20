import { useState, useEffect } from 'react';
import { Save, RefreshCw, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { useContent, SiteContent } from '../hooks/useContent';

export default function AdminContent() {
  const { allContent, loading, error, updateContent, refetch } = useContent();
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPage, setFilterPage] = useState<string>('all');

  useEffect(() => {
    const initialValues: Record<string, string> = {};
    allContent.forEach((item) => {
      initialValues[item.key] = item.value;
    });
    setEditedValues(initialValues);
  }, [allContent]);

  const handleValueChange = (key: string, value: string) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
    setSavedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  };

  const handleSave = async (key: string) => {
    setSavingKeys((prev) => new Set(prev).add(key));
    const result = await updateContent(key, editedValues[key]);
    setSavingKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });

    if (result.success) {
      setSavedKeys((prev) => new Set(prev).add(key));
      setTimeout(() => {
        setSavedKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      }, 3000);
    }
  };

  const handleSaveAll = async () => {
    const changedKeys = allContent
      .filter((item) => editedValues[item.key] !== item.value)
      .map((item) => item.key);

    for (const key of changedKeys) {
      await handleSave(key);
    }
  };

  const hasChanges = allContent.some((item) => editedValues[item.key] !== item.value);

  const pages = Array.from(new Set(allContent.map((item) => item.page)));

  const filteredContent = allContent.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPage = filterPage === 'all' || item.page === filterPage;

    return matchesSearch && matchesPage;
  });

  const groupedContent = filteredContent.reduce((acc, item) => {
    if (!acc[item.page]) {
      acc[item.page] = [];
    }
    acc[item.page].push(item);
    return acc;
  }, {} as Record<string, SiteContent[]>);

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
          <span>Error loading content: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Content Management</h1>
          <p className="text-gray-600 mt-1">Edit text, images, and other site content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={refetch}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          {hasChanges && (
            <button
              onClick={handleSaveAll}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save All Changes
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterPage}
              onChange={(e) => setFilterPage(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="all">All Pages</option>
              {pages.map((page) => (
                <option key={page} value={page}>
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedContent).map(([page, items]) => (
          <div key={page} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">{page}</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {items.map((item) => {
                const isSaving = savingKeys.has(item.key);
                const isSaved = savedKeys.has(item.key);
                const hasChanged = editedValues[item.key] !== item.value;

                return (
                  <div key={item.key} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <label className="text-sm font-semibold text-gray-900">{item.label}</label>
                          {hasChanged && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Modified
                            </span>
                          )}
                          {isSaved && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Saved
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{item.key}</span>
                          <span>•</span>
                          <span className="capitalize">{item.type}</span>
                        </div>
                        {item.type === 'textarea' ? (
                          <textarea
                            value={editedValues[item.key] || ''}
                            onChange={(e) => handleValueChange(item.key, e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans"
                          />
                        ) : (
                          <input
                            type={item.type === 'url' ? 'url' : 'text'}
                            value={editedValues[item.key] || ''}
                            onChange={(e) => handleValueChange(item.key, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        )}
                      </div>
                      <button
                        onClick={() => handleSave(item.key)}
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
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No content found matching your search.</p>
        </div>
      )}
    </div>
  );
}
