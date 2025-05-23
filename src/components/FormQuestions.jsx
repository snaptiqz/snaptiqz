import React, { useState, useEffect } from "react";
import {
  ChevronsUpDown,
  Plus,
  CalendarDays,
  Trash,
  X,
  Mail,
  User,
  Phone,
  AlignLeft,
  Calendar,
  ChevronDown,
  CircleDot,
  MessageSquare,
  Sparkles,
  Zap,
  Users,
  MapPin,
  Camera,
  Link,
  Star,
  Heart,
  Coffee,
  Music,
  Palette,
  Crown,
  Target,
  CheckCircle2,
  Copy,
  Wand2
} from "lucide-react";

const quickTemplates = [
  {
    category: "Essential Info",
    icon: User,
    color: "from-blue-500 to-cyan-500",
    questions: [
      { label: "Full Name", type: "Name", icon: User },
      { label: "Email Address", type: "Email", icon: Mail },
      { label: "Phone Number", type: "Phone", icon: Phone },
    ]
  },
  {
    category: "Event Specific",
    icon: Calendar,
    color: "from-purple-500 to-pink-500",
    questions: [
      { label: "Dietary Restrictions", type: "Short Text", icon: Coffee },
      { label: "T-Shirt Size", type: "Dropdown", icon: Users, options: ["XS", "S", "M", "L", "XL", "XXL"] },
      { label: "Emergency Contact", type: "Short Text", icon: Phone },
    ]
  },
  {
    category: "Social & Fun",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    questions: [
      { label: "Instagram Handle", type: "Short Text", icon: Camera },
      { label: "LinkedIn Profile", type: "Short Text", icon: Link },
      { label: "Fun Fact About You", type: "Long Text", icon: Star },
    ]
  },
  {
    category: "Professional",
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    questions: [
      { label: "Company/Organization", type: "Short Text", icon: Target },
      { label: "Job Title", type: "Short Text", icon: Crown },
      { label: "Years of Experience", type: "Dropdown", icon: Star, options: ["0-1", "2-5", "6-10", "10+"] },
    ]
  }
];

const questionTypes = [
  { name: "Name", icon: User, description: "Full name field" },
  { name: "Email", icon: Mail, description: "Email validation included" },
  { name: "Phone", icon: Phone, description: "Phone number format" },
  { name: "Short Text", icon: MessageSquare, description: "Single line input" },
  { name: "Long Text", icon: AlignLeft, description: "Multi-line textarea" },
  { name: "Date", icon: Calendar, description: "Date picker" },
  { name: "Dropdown", icon: ChevronDown, description: "Single selection" },
  { name: "Radio", icon: CircleDot, description: "Single choice" },
];

const initialQuestionTemplate = {
  label: "",
  type: "",
  required: true,
  order: 1,
  options: [""],
  defaultValue: "",
  placeholder: "",
  description: "",
  validations: {},
  showDropdown: false,
  icon: User,
};

const FormQuestions = ({ questions = [], setQuestions }) => {
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState(initialQuestionTemplate);
  const [modalStep, setModalStep] = useState('template'); // 'template', 'custom', 'preview'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Smart placeholder generation
  const generatePlaceholder = (label, type) => {
    const placeholders = {
      'Name': 'Enter your full name',
      'Email': 'your.email@example.com',
      'Phone': '+1 (555) 123-4567',
      'Short Text': `Enter your ${label.toLowerCase()}`,
      'Long Text': `Tell us about your ${label.toLowerCase()}...`,
      'Date': 'Select a date',
    };
    return placeholders[type] || `Enter ${label.toLowerCase()}`;
  };

  // Auto-generate options for common dropdowns
  const generateSmartOptions = (label) => {
    const smartOptions = {
      'size': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      'experience': ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      'attendance': ['First time', 'Returning attendee', 'Regular participant'],
      'role': ['Student', 'Professional', 'Entrepreneur', 'Other'],
      'industry': ['Technology', 'Healthcare', 'Finance', 'Education', 'Other'],
    };
    
    const lowerLabel = label.toLowerCase();
    for (const [key, options] of Object.entries(smartOptions)) {
      if (lowerLabel.includes(key)) return options;
    }
    return ['Option 1', 'Option 2', 'Option 3'];
  };

  const handleChangeLabel = (index, value) => {
    const updated = [...questions];
    updated[index].label = value;
    updated[index].placeholder = generatePlaceholder(value, updated[index].type);
    setQuestions(updated);
  };

  const handleChangeDescription = (index, value) => {
    const updated = [...questions];
    updated[index].description = value;
    setQuestions(updated);
  };

  const handleChangePlaceholder = (index, value) => {
    const updated = [...questions];
    updated[index].placeholder = value;
    setQuestions(updated);
  };

  const handleQuestionOptionChange = (questionIndex, optionIndex, value) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const addQuestionOption = (questionIndex) => {
    const updated = [...questions];
    updated[questionIndex].options.push("");
    setQuestions(updated);
  };

  const removeQuestionOption = (questionIndex, optionIndex) => {
    const updated = [...questions];
    updated[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updated);
  };

  const handleTypeChange = (index, type) => {
    const updated = [...questions];
    updated[index].type = type;
    updated[index].showDropdown = false;
    updated[index].placeholder = generatePlaceholder(updated[index].label, type);
    
    // Auto-generate options if it's a dropdown/radio
    if ((type === 'Dropdown' || type === 'Radio') && updated[index].options.length <= 1) {
      updated[index].options = generateSmartOptions(updated[index].label);
    }
    
    setQuestions(updated);
  };

  const toggleRequired = (index, required) => {
    const updated = [...questions];
    updated[index].required = required;
    updated[index].showDropdown = false;
    setQuestions(updated);
  };

  const toggleDropdown = (index) => {
    const updated = [...questions];
    updated[index].showDropdown = !updated[index].showDropdown;
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    // Reorder remaining questions
    updated.forEach((q, idx) => {
      q.order = idx + 1;
    });
    setQuestions(updated);
    setExpandedQuestion(null);
  };

  const startEditingQuestion = (index) => {
    setEditingQuestion(index);
    setNewQuestion({ ...questions[index] });
    setModalStep('custom');
    setShowModal(true);
  };

  const saveEditedQuestion = () => {
    if (!newQuestion.label || !newQuestion.type) return;
    const updated = [...questions];
    updated[editingQuestion] = {
      ...newQuestion,
      placeholder: generatePlaceholder(newQuestion.label, newQuestion.type),
    };
    setQuestions(updated);
    setShowModal(false);
    setEditingQuestion(null);
    setNewQuestion(initialQuestionTemplate);
    setModalStep('template');
  };

  const handleModalChange = (field, value) => {
    let updatedQuestion = { ...newQuestion, [field]: value };
    
    // Auto-generate placeholder when label or type changes
    if (field === 'label' || field === 'type') {
      updatedQuestion.placeholder = generatePlaceholder(
        field === 'label' ? value : updatedQuestion.label,
        field === 'type' ? value : updatedQuestion.type
      );
    }
    
    // Auto-generate options for dropdown/radio
    if (field === 'type' && (value === 'Dropdown' || value === 'Radio')) {
      updatedQuestion.options = generateSmartOptions(updatedQuestion.label);
    }
    
    setNewQuestion(updatedQuestion);
  };

  const handleOptionChange = (idx, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[idx] = value;
    setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const addOption = () => {
    setNewQuestion((prev) => ({ ...prev, options: [...prev.options, ""] }));
  };

  const removeOption = (idx) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions.splice(idx, 1);
    setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const addTemplateQuestions = (template) => {
    const newQuestions = template.questions.map((q, idx) => ({
      ...initialQuestionTemplate,
      ...q,
      order: questions.length + idx + 1,
      placeholder: generatePlaceholder(q.label, q.type),
      required: true,
      showDropdown: false,
    }));
    
    setQuestions([...questions, ...newQuestions]);
    setShowModal(false);
    setModalStep('template');
  };

  const saveNewQuestion = () => {
    if (!newQuestion.label || !newQuestion.type) return;
    setQuestions([
      ...questions,
      {
        ...newQuestion,
        order: questions.length + 1,
        showDropdown: false,
        placeholder: generatePlaceholder(newQuestion.label, newQuestion.type),
      },
    ]);
    setShowModal(false);
    setNewQuestion(initialQuestionTemplate);
    setModalStep('template');
  };

  const getTypeIcon = (typeName) => {
    const typeObj = questionTypes.find(t => t.name === typeName);
    return typeObj ? typeObj.icon : User;
  };

  const filteredTemplates = quickTemplates.filter(template =>
    template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.questions.some(q => q.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Registration Questions</h3>
          <p className="text-xs text-white/60 mt-1">Collect the info you need from attendees</p>
        </div>
        {questions.length > 0 && (
          <div className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">
            {questions.length} question{questions.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

     {questions.length === 0 && (
  <div className="bg-[#1a1a1a] border border-white/20 rounded-xl p-6 text-center">
    <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-3 shadow">
      <Sparkles className="w-6 h-6 text-white" />
    </div>
    <h4 className="text-white font-semibold mb-2">Ready to collect attendee info?</h4>
    <p className="text-white/60 text-sm mb-4">Use custom fields to ask relevant questions to guests</p>
    <button
      onClick={() => setShowModal(true)}
      className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
    >
      <Wand2 className="w-4 h-4 inline mr-2" />
      Add Questions
    </button>
  </div>
)}


      {questions.map((q, index) => {
        const IconComponent = getTypeIcon(q.type);
        const isExpanded = expandedQuestion === index;
        return (
         <div
  key={index}
  className="w-full bg-[#2b2b2b] border border-white/10 rounded-xl hover:border-white/20 transition-all group"
>
  <div className="px-3 sm:px-4 py-3">
    <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-md flex items-center justify-center flex-shrink-0">
        <span className="text-white/80 text-sm font-medium">{index + 1}</span>
      </div>

      <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0">
        <IconComponent className="w-3 h-3 text-white/70" />
      </div>

      <div className="flex-1 w-full min-w-0">
        <input
          type="text"
          value={q.label}
          placeholder="Enter your question..."
          onChange={(e) => handleChangeLabel(index, e.target.value)}
          className="bg-transparent text-white w-full outline-none placeholder-white/40 text-sm font-medium"
        />
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-xs text-white/50">{q.type}</span>
          <span className="text-xs text-white/30">•</span>
          <span className="text-xs text-white/50">{q.required ? "Required" : "Optional"}</span>
          {(q.type === 'Dropdown' || q.type === 'Radio') && q.options?.length > 0 && (
            <>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs text-white/40">{q.options.length} options</span>
            </>
          )}
          {q.placeholder && (
            <>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs text-white/40 truncate">{q.placeholder}</span>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1  group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setExpandedQuestion(isExpanded ? null : index)}
          className="text-white/60 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10"
          title={isExpanded ? "Collapse" : "Expand"}
        >
          <ChevronsUpDown size={14} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <button
          onClick={() => startEditingQuestion(index)}
          className="text-white/60 hover:text-blue-400 transition-colors p-1.5 rounded hover:bg-blue-500/10"
          title="Edit question"
        >
          <Wand2 size={14} />
        </button>

        {/* Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown(index)}
            className="text-white/60 hover:text-white transition-colors p-1.5 rounded hover:bg-white/10"
            title="Quick settings"
          >
            <ChevronsUpDown size={14} />
          </button>

          {q.showDropdown && (
  <div className="absolute right-0 mt-1 bg-[#1e1e1e] border border-white/20 rounded-lg shadow-xl z-10 w-48 text-xs overflow-hidden max-h-72">

    
    <div className="overflow-y-auto max-h-56 custom-scrollbar">
      {/* Field Type Options */}
     

      {/* Requirement Header */}
      <div className="border-t border-white/10 px-3 py-2 text-white/60 font-medium">Requirement</div>

      {/* Requirement Options */}
      {["Required", "Optional"].map((r) => (
        <div
          key={r}
          onClick={() => toggleRequired(index, r === "Required")}
          className="px-3 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-2"
        >
          <CheckCircle2
            size={14}
            className={
              q.required === (r === "Required") ? "text-green-400" : "text-white/40"
            }
          />
          <span className={q.required === (r === "Required") ? "text-white" : "text-white/40"}>
            {r}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

        </div>

        <button
          onClick={() => removeQuestion(index)}
          className="text-white/40 hover:text-red-400 transition-colors p-1.5 rounded hover:bg-red-500/10"
          title="Delete question"
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  </div>



            {isExpanded && (
              <div className="border-t border-white/10 px-4 py-3 space-y-3 bg-white/5">
                <div>
                  <label className="block text-white/80 text-xs font-medium mb-1">Placeholder Text</label>
                  <input
                    type="text"
                    value={q.placeholder || ''}
                    onChange={(e) => handleChangePlaceholder(index, e.target.value)}
                    placeholder="Enter placeholder text..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white text-xs rounded-lg focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-xs font-medium mb-1">Description</label>
                  <textarea
                    value={q.description || ''}
                    onChange={(e) => handleChangeDescription(index, e.target.value)}
                    placeholder="Add helpful context for this question..."
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 text-white text-xs rounded-lg focus:outline-none focus:border-white/40 transition-colors resize-none"
                    rows="2"
                  />
                </div>

                {(q.type === 'Dropdown' || q.type === 'Radio') && (
                  <div>
                    <label className="block text-white/80 text-xs font-medium mb-2">Options</label>
                    <div className="space-y-2">
                      {q.options && q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white/60 text-xs">{optIdx + 1}</span>
                          </div>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleQuestionOptionChange(index, optIdx, e.target.value)}
                            placeholder={`Option ${optIdx + 1}`}
                            className="flex-1 px-3 py-1.5 bg-white/5 border border-white/20 text-white text-xs rounded focus:outline-none focus:border-white/40 transition-colors"
                          />
                          {q.options.length > 1 && (
                            <button 
                              onClick={() => removeQuestionOption(index, optIdx)} 
                              className="text-white/40 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                            >
                              <Trash size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addQuestionOption(index)}
                        className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
                      >
                        <Plus size={12} />
                        Add Option
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-2 mt-4">
       <button
  onClick={() => setShowModal(true)}
  className="text-sm bg-gradient-to-r from-[#2b2b2b] via-[#1e1e1e] to-[#2b2b2b] border border-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-[#3a3a3a] hover:to-[#2c2c2c] transition-all font-medium"
>
  <Plus size={16} /> Add Question
</button>

        
        {questions.length > 0 && (
          <button
            onClick={() => {
              const essentials = quickTemplates[0].questions;
              const hasName = questions.some(q => q.type === 'Name');
              const hasEmail = questions.some(q => q.type === 'Email');
              
              if (!hasName || !hasEmail) {
                const needed = [];
                if (!hasName) needed.push(essentials[0]);
                if (!hasEmail) needed.push(essentials[1]);
                
                const newQuestions = needed.map((q, idx) => ({
                  ...initialQuestionTemplate,
                  ...q,
                  order: questions.length + idx + 1,
                  placeholder: generatePlaceholder(q.label, q.type),
                  required: true,
                  showDropdown: false,
                }));
                
                setQuestions([...questions, ...newQuestions]);
              }
            }}
            className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all border border-white/10"
          >
            <Zap size={16} /> Quick Essentials
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-2xl w-full max-w-2xl border border-white/20 shadow-2xl max-h-[90vh] overflow-hidden">
            
            {modalStep === 'template' && (
              <>
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <div>
                    <h2 className="text-white text-lg font-semibold">Add Questions</h2>
                    <p className="text-white/60 text-sm mt-1">Choose from templates or create custom questions</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="text-white/60 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white text-sm rounded-xl pl-10 focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplates.map((template, idx) => {
                      const IconComp = template.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => addTemplateQuestions(template)}
                          className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-4 transition-all"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center`}>
                              <IconComp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{template.category}</h3>
                              <p className="text-white/60 text-xs">{template.questions.length} questions</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {template.questions.slice(0, 3).map((q, qIdx) => {
                              const QIcon = q.icon;
                              return (
                                <div key={qIdx} className="flex items-center gap-2 text-xs text-white/70">
                                  <QIcon size={12} />
                                  <span>{q.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <button
                      onClick={() => setModalStep('custom')}
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={16} />
                      Create Custom Question
                    </button>
                  </div>
                </div>
              </>
            )}

            {modalStep === 'custom' && (
              <>
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setModalStep('template')}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      ←
                    </button>
                    <div>
                      <h2 className="text-white text-lg font-semibold">
                        {editingQuestion !== null ? 'Edit Question' : 'Custom Question'}
                      </h2>
                      <p className="text-white/60 text-sm mt-1">
                        {editingQuestion !== null ? 'Update your question details' : 'Create a personalized question'}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => {
                    setShowModal(false);
                    setEditingQuestion(null);
                    setNewQuestion(initialQuestionTemplate);
                    setModalStep('template');
                  }} className="text-white/60 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Question Label</label>
                    <input
                      type="text"
                      placeholder="What do you want to ask?"
                      value={newQuestion.label}
                      onChange={(e) => handleModalChange("label", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white text-sm rounded-xl focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Field Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {questionTypes.map((type) => {
                        const IconComp = type.icon;
                        return (
                          <button
                            key={type.name}
                            onClick={() => handleModalChange("type", type.name)}
                            className={`p-3 rounded-xl border transition-all text-left ${
                              newQuestion.type === type.name
                                ? 'bg-blue-500/20 border-blue-500/50 text-white'
                                : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <IconComp size={16} />
                              <span className="font-medium text-sm">{type.name}</span>
                            </div>
                            <p className="text-xs opacity-70">{type.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {(newQuestion.type === "Dropdown" || newQuestion.type === "Radio") && (
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-3">Options</label>
                      <div className="space-y-2">
                        {newQuestion.options.map((opt, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                              <span className="text-white/60 text-xs">{idx + 1}</span>
                            </div>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => handleOptionChange(idx, e.target.value)}
                              placeholder={`Option ${idx + 1}`}
                              className="flex-1 px-3 py-2 bg-white/5 border border-white/20 text-white text-sm rounded-lg focus:outline-none focus:border-white/40 transition-colors"
                            />
                            {newQuestion.options.length > 1 && (
                              <button 
                                onClick={() => removeOption(idx)} 
                                className="text-white/40 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                              >
                                <Trash size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={addOption}
                          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                        >
                          <Plus size={14} />
                          Add Option
                        </button>
                      </div>
                    </div>
                  )}

                  {newQuestion.placeholder && (
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Placeholder Text</label>
                      <input
                        type="text"
                        value={newQuestion.placeholder}
                        onChange={(e) => handleModalChange("placeholder", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white text-sm rounded-xl focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Description (Optional)</label>
                    <textarea
                      placeholder="Add helpful context for this question..."
                      value={newQuestion.description}
                      onChange={(e) => handleModalChange("description", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white text-sm rounded-xl focus:outline-none focus:border-white/40 transition-colors resize-none"
                      rows="2"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setModalStep('template')}
                      className="px-4 py-2 text-white/70 hover:text-white transition-colors text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={saveNewQuestion}
                      disabled={!newQuestion.label || !newQuestion.type}
                      className="px-6 py-2 bg-gradient-to-r from-[#2b2b2b] via-[#1e1e1e] to-[#2b2b2b] border border-white/20 text-white rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormQuestions;