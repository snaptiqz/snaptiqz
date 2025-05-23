import React from 'react';
import { Tags, Plus, Check, X } from 'lucide-react';

const TagsInput = ({
  tags,
  setTags,
  tagInput,
  setTagInput,
  showTagInput,
  setShowTagInput
}) => {
  const addTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      {/* Tag Input Field */}
      {showTagInput ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
              <Tags size={16} />
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
              className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-white/40"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
          </div>
          <button
            onClick={addTag}
            className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            <Check size={16} />
          </button>
          <button
            onClick={() => setShowTagInput(false)}
            className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          className="flex items-center justify-center gap-2 w-full bg-[#2b2b2b] px-4 py-3 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition"
          onClick={() => setShowTagInput(true)}
        >
          <Plus size={16} /> Add Tags
        </button>
      )}

      {/* Tag List */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-red-300 transition ml-1"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
