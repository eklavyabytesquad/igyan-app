# 📊 Content Generator - AI-Powered Document Creation

## 📋 Table of Contents
- [Overview](#overview)
- [How It Works](#how-it-works)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Component Breakdown](#component-breakdown)
- [Data Flow](#data-flow)
- [React Native Migration Guide](#react-native-migration-guide)

---

## 🎯 Overview

Content Generator is an AI-powered tool that creates professional presentations (PowerPoint) and documents (PDF) instantly. It features three generation modes:
1. **Standard PPT** - Educational presentations with 5-7 slides
2. **PDF Document** - Formatted text documents
3. **Shark PPT** - Investor-ready pitch decks (5-slide format for Indian market)

### Key Capabilities
- 🤖 **AI Content Generation**: OpenAI GPT-4 creates comprehensive content
- 🎨 **Multiple Templates**: Choose from professional design templates
- 📝 **Live Editing**: Edit slides before downloading (Shark PPT mode)
- 🎯 **Shark Tank Mode**: Indian investor pitch deck with ₹ Crore/Lakh notation
- 📥 **Instant Download**: Generate and download PPT/PDF files
- 👁️ **Live Preview**: View content before downloading

---

## 🔧 How It Works

### Step-by-Step Flow

#### 1. **Input Phase**
- User enters topic/company name
- Selects format: PPT / PDF / Shark PPT
- Chooses template style (2 options)
- Clicks "Generate" button

#### 2. **AI Generation Phase**
- **Standard PPT/PDF**:
  - Sends topic to OpenAI GPT-4-mini
  - AI creates 5-7 sections with bullet points
  - Returns JSON with title and formatted content
  - Structure: Introduction → Sections → Examples → Key Concepts

- **Shark PPT** (Investor Pitch):
  - Uses specialized Indian market prompt
  - AI generates exactly 5 slides:
    1. Company Introduction (1-2 min)
    2. Problem & Solution (1 min)
    3. Business Model (1 min)
    4. Market Opportunity (1 min)
    5. The Ask (30 sec)
  - Returns JSON with slides, metrics, and taglines
  - All monetary values in ₹ Crores/Lakhs

#### 3. **Preview & Edit Phase** (Shark PPT)
- Displays generated slides in preview
- Each slide shows:
  - Title and subtitle
  - Bullet points (editable)
  - Metrics with values (editable)
  - Speaking time guidance
- Click "Edit" icon to modify content
- Changes saved in local state

#### 4. **Download Phase**
- **PPT Generation**:
  - Uses PptxGenJS library
  - Applies selected template colors/fonts
  - Creates title slide + content slides
  - Downloads .pptx file

- **PDF Generation**:
  - Uses jsPDF library
  - Formats content with sections
  - Applies template styling
  - Downloads .pdf file

- **Shark PPT Generation**:
  - Custom 5-slide format
  - Large metrics display
  - Professional investor layout
  - Uses edited content if modified

#### 5. **Reset Phase**
- User can reset to start new generation
- Clears all state and content
- Returns to input form

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  page.js    │  │  Components  │  │   Templates  │        │
│  │ (Main Logic)│  │  (3 modules) │  │  (2 styles)  │        │
│  └─────────────┘  └──────────────┘  └──────────────┘        │
│         │                  │                  │               │
│         └──────────────────┴──────────────────┘               │
│                           │                                   │
└───────────────────────────┼───────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │   OpenAI API   │
                    │ (GPT-4o-mini)  │
                    │                │
                    │ • Standard     │
                    │ • Shark Pitch  │
                    └───────┬────────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                  Document Generation                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  PptxGenJS   │  │    jsPDF     │  │   Shark PPT  │        │
│  │ (Standard)   │  │   (PDF Gen)  │  │  (Investor)  │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 1. Three Generation Modes

#### Standard PPT
- **Educational Content**: 5-7 detailed slides
- **Comprehensive**: Introduction, sections, examples, key concepts
- **Professional**: Clean, educational layout
- **Customizable**: 2 template styles

#### PDF Document
- **Text-Based**: Formatted document with sections
- **Structured**: Clear headings and bullet points
- **Professional**: Business document styling
- **Templates**: 2 design options

#### Shark PPT (Investor Pitch)
- **Fixed Structure**: Exactly 5 slides for 5-minute pitch
- **Indian Market**: ₹ Crores/Lakhs notation
- **Sophisticated Language**: "Paradigm shift", "Catalyse", "Burgeoning"
- **Metrics-Driven**: TAM, SAM, ARPU, etc.
- **Editable**: Live editing before download
- **Professional**: Investor-ready design

### 2. Template System

**2 Template Styles** (simplified from 6):

1. **Professional**
   - Colors: Blue primary, clean white background
   - Font: 44pt title, 32pt heading, 18pt body
   - Use Case: Corporate, educational

2. **Vibrant**
   - Colors: Red/Teal accent, energetic
   - Font: Same sizing
   - Use Case: Startups, creative pitches

### 3. Live Editing (Shark PPT)
- **Slide Editing**: Click edit icon on any slide
- **Field Editing**: Modify title, subtitle, content
- **Metric Editing**: Change values and labels
- **Real-time Preview**: See changes immediately
- **Save/Cancel**: Commit or discard edits

### 4. Smart Content Generation

**AI Prompts**:
- **Standard**: Educational, comprehensive, 5-7 sections
- **Shark**: Indian investor focus, sophisticated vocabulary, metrics-heavy
- **JSON Response**: Structured data for parsing

**Vocabulary Guidance** (Shark PPT):
- "Paradigm shift" not "change"
- "Unprecedented" not "new"
- "Catalyse" not "help"
- "Burgeoning" not "growing"
- "Democratise" not "make available"

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI**: React 18+ with Hooks
- **Styling**: Tailwind CSS + CSS Variables
- **Icons**: Lucide React
- **State**: React useState

### AI & APIs
- **AI**: OpenAI GPT-4o-mini
- **SDK**: openai (official SDK)
- **API Key**: Environment variable
- **Response Format**: JSON

### Document Generation
- **PPT**: PptxGenJS library
- **PDF**: jsPDF library
- **Custom**: Shark PPT generator (custom logic)

### Browser Features
- **File Download**: Blob API
- **JSON Parsing**: Native JSON
- **Local State**: React state management

---

## 🔌 API Integration

### OpenAI Chat Completion

```javascript
// Standard Content Generation
POST https://api.openai.com/v1/chat/completions
Authorization: Bearer {OPENAI_API_KEY}
Content-Type: application/json

Body: {
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "You are a professional content creator..."
    },
    {
      role: "user",
      content: "Create content about: Photosynthesis"
    }
  ],
  temperature: 0.7,
  max_tokens: 2000,
  response_format: { type: "json_object" }
}

Response: {
  choices: [
    {
      message: {
        content: '{"title":"...","content":"..."}'
      }
    }
  ]
}
```

### Shark PPT Generation

```javascript
POST https://api.openai.com/v1/chat/completions

Body: {
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "You are a distinguished startup pitch strategist..."
    },
    {
      role: "user",
      content: "Craft investor pitch for: AI Tutoring Platform"
    }
  ],
  temperature: 0.7,
  max_tokens: 3000,
  response_format: { type: "json_object" }
}

Response: {
  choices: [
    {
      message: {
        content: '{
          "title": "EduAI - Revolutionizing Learning",
          "slides": [
            {
              "id": 1,
              "title": "Company Introduction",
              "timing": "1-2 minutes",
              "subtitle": "Pioneering EdTech Innovation",
              "content": "- Democratising quality education...",
              "tagline": "Empowering every learner",
              "metrics": [{"value": "1L+", "label": "Active Users"}]
            }
            // ... 4 more slides
          ]
        }'
      }
    }
  ]
}
```

---

## 🧩 Component Breakdown

### Main Component (`page.js`)

**State Management** (12 state variables):
```javascript
const [topic, setTopic] = useState('');
const [contentType, setContentType] = useState('ppt');
const [isGenerating, setIsGenerating] = useState(false);
const [generatedContent, setGeneratedContent] = useState(null);
const [selectedPPTTemplate, setSelectedPPTTemplate] = useState(templates[0]);
const [selectedPDFTemplate, setSelectedPDFTemplate] = useState(templates[0]);
const [selectedSharkTemplate, setSelectedSharkTemplate] = useState(templates[0]);
const [showPreview, setShowPreview] = useState(false);
const [isDownloading, setIsDownloading] = useState(false);
const [isFullscreen, setIsFullscreen] = useState(false);
const [editingSlideIndex, setEditingSlideIndex] = useState(null);
const [editedSlides, setEditedSlides] = useState(null);
```

**Key Functions**:
- `handleGenerate()` - Calls OpenAI, generates content
- `handleDownload()` - Creates PPT/PDF file
- `handleReset()` - Clears state
- `handleSlideEdit()` - Edits slide content
- `handleMetricEdit()` - Edits metric values
- `getSharkPitchPrompt()` - Returns investor pitch prompt

### Sub-Components

#### 1. **TemplateSelector.js**
- **Purpose**: Select template style
- **Features**:
  - Grid of template cards
  - Color preview
  - Active state indicator
  - Click to select
- **Props**:
  - `templates` - Array of template objects
  - `selectedTemplate` - Currently selected
  - `onSelect(template)` - Selection callback
  - `type` - 'ppt' or 'pdf' or 'shark-ppt'

#### 2. **PreviewModal.js**
- **Purpose**: Show content before download
- **Features**:
  - Modal overlay
  - Formatted content display
  - Close button
  - Fullscreen option
  - Scroll for long content
- **Props**:
  - `isOpen` - Show/hide modal
  - `onClose()` - Close callback
  - `content` - Generated content
  - `title` - Document title
  - `type` - Content type

#### 3. **ChatMessage.js**
- **Purpose**: Display generation status messages
- **Features**:
  - User message (topic input)
  - AI response (generated content)
  - Loading state
  - Error messages
- **Props**:
  - `role` - 'user' or 'assistant'
  - `content` - Message text
  - `isLoading` - Show loader

---

## 📊 Data Flow

### Standard PPT/PDF Flow
```
User enters topic
  → handleGenerate()
    → Call OpenAI API
      → System: "Professional content creator"
      → User: "Create content about: [topic]"
      → Response: { title, content }
    → setGeneratedContent({ type, content, title })
    → Display preview/download option

User clicks Download
  → handleDownload()
    → if PPT: generatePPT(content, title, template)
      → PptxGenJS creates presentation
      → Parse content into slides
      → Apply template styling
      → Download .pptx file
    → if PDF: generatePDF(content, title, template)
      → jsPDF creates document
      → Format sections and bullets
      → Apply template colors
      → Download .pdf file
```

### Shark PPT Flow
```
User enters company idea
  → Select "Shark PPT" mode
  → handleGenerate()
    → Call OpenAI with Shark Prompt
      → System: "Distinguished startup pitch strategist..."
      → User: "Craft investor pitch for: [idea]"
      → Response: { title, slides: [...5 slides] }
    → setGeneratedContent({ type: 'shark-ppt', slides })
    → setEditedSlides(slides)
    → Display slide preview

User views slides
  → Each slide shows:
    - Title, subtitle, timing
    - Bullet points
    - Metrics (if any)
    - Edit button

User clicks Edit (optional)
  → setEditingSlideIndex(index)
  → Show editable fields
  → User modifies content
  → handleSlideEdit(index, field, value)
    → Update editedSlides array
  → Click save/cancel

User clicks Download
  → handleDownload()
    → generateSharkPPT(editedSlides, title, template)
      → Create 5-slide pitch deck
      → Slide 1: Introduction + metrics
      → Slide 2: Problem & Solution
      → Slide 3: Business Model + metrics
      → Slide 4: Market Opportunity + metrics
      → Slide 5: The Ask + metrics
      → Apply investor-focused styling
      → Download .pptx file
```

---

## 📱 React Native Migration Guide

### Overview
Converting Content Generator to React Native requires replacing document generation libraries, file handling, and implementing mobile-specific UI patterns.

---

### Key Challenges & Solutions

#### 1. **Document Generation Libraries**

**Web**
```javascript
// PPT: PptxGenJS (browser-based)
import pptxgen from 'pptxgenjs';
const pres = new pptxgen();
pres.addSlide().addText('Hello', {...});
pres.writeFile({ fileName: 'presentation.pptx' });

// PDF: jsPDF (browser-based)
import { jsPDF } from 'jspdf';
const doc = new jsPDF();
doc.text('Hello', 10, 10);
doc.save('document.pdf');
```

**React Native**
```javascript
// Option 1: Backend API (Recommended)
// Generate documents on server, return download URL

const generateDocument = async (content, type) => {
  const response = await fetch(`${API_URL}/generate-document`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      type, // 'ppt' or 'pdf' or 'shark-ppt'
      template: selectedTemplate,
    }),
  });
  
  const { downloadUrl } = await response.json();
  return downloadUrl;
};

// Option 2: WebView (Less recommended)
// Use react-native-webview to run browser libraries

import { WebView } from 'react-native-webview';

<WebView
  source={{ html: documentGeneratorHTML }}
  onMessage={(event) => {
    const { type, data } = JSON.parse(event.nativeEvent.data);
    if (type === 'document-ready') {
      // Handle download
    }
  }}
/>

// Option 3: Native modules
// Install: react-native-document-picker, react-native-fs

import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const downloadDocument = async (url, fileName) => {
  const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  
  const result = await RNFS.downloadFile({
    fromUrl: url,
    toFile: downloadDest,
  }).promise;
  
  if (result.statusCode === 200) {
    // Share or open file
    await Share.open({
      url: `file://${downloadDest}`,
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    });
  }
};
```

**Recommended Approach**:
```javascript
// Backend API Service (Node.js/Python)
// Install on server: pptxgenjs, jspdf

// server.js
const express = require('express');
const pptxgen = require('pptxgenjs');
const { jsPDF } = require('jspdf');

app.post('/api/generate-document', async (req, res) => {
  const { content, type, template } = req.body;
  
  let filePath;
  
  if (type === 'ppt' || type === 'shark-ppt') {
    const pres = new pptxgen();
    // Generate PPT with content
    filePath = await generatePPT(content, template);
  } else if (type === 'pdf') {
    const doc = new jsPDF();
    // Generate PDF with content
    filePath = await generatePDF(content, template);
  }
  
  // Upload to cloud storage or return base64
  const downloadUrl = await uploadToS3(filePath);
  
  res.json({ downloadUrl, fileName: 'document.pptx' });
});

// React Native Client
const handleDownload = async () => {
  setIsDownloading(true);
  try {
    const url = await generateDocument(generatedContent, contentType);
    
    // Download and share
    await downloadAndShare(url, `${generatedContent.title}.pptx`);
    
    Alert.alert('Success', 'Document downloaded successfully!');
  } catch (error) {
    Alert.alert('Error', 'Failed to download document');
  } finally {
    setIsDownloading(false);
  }
};
```

---

#### 2. **File Download & Sharing**

**Web**
```javascript
// Browser download
const blob = new Blob([data], { type: 'application/...' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'file.pptx';
link.click();
```

**React Native**
```javascript
// Install: react-native-fs, react-native-share
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const downloadAndShare = async (url, fileName) => {
  try {
    // Download file
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    
    const download = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
      background: true,
      progressDivider: 10,
      begin: (res) => {
        console.log('Download started');
      },
      progress: (res) => {
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress}%`);
      },
    });
    
    const result = await download.promise;
    
    if (result.statusCode === 200) {
      // Share file
      const shareOptions = {
        title: 'Share Document',
        url: `file://${downloadDest}`,
        type: fileName.endsWith('.pdf') 
          ? 'application/pdf' 
          : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      };
      
      await Share.open(shareOptions);
    }
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};
```

---

#### 3. **Template Selection**

**Web**
```javascript
<div className="grid gap-4 sm:grid-cols-2">
  {templates.map(template => (
    <button onClick={() => setSelected(template)}>
      {template.name}
    </button>
  ))}
</div>
```

**React Native**
```javascript
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TemplateSelector = ({ templates, selected, onSelect }) => {
  return (
    <View style={styles.grid}>
      {templates.map(template => (
        <TouchableOpacity
          key={template.id}
          style={[
            styles.templateCard,
            selected.id === template.id && styles.selected
          ]}
          onPress={() => onSelect(template)}
        >
          <View style={styles.colorPreview}>
            {/* Color dots */}
            <View style={[styles.colorDot, { 
              backgroundColor: `#${template.colors.primary}` 
            }]} />
          </View>
          <Text style={styles.templateName}>{template.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  templateCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  selected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f0ff',
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
  },
});
```

---

#### 4. **Slide Preview & Editing**

**Web**
```javascript
<div className="slide-preview">
  {isEditing ? (
    <textarea value={content} onChange={handleChange} />
  ) : (
    <p>{content}</p>
  )}
  <button onClick={() => setEditing(!isEditing)}>Edit</button>
</div>
```

**React Native**
```javascript
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const SlidePreview = ({ slide, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(slide.content);

  const saveEdit = () => {
    onEdit(slide.id, 'content', editedContent);
    setIsEditing(false);
  };

  return (
    <View style={styles.slideCard}>
      <View style={styles.slideHeader}>
        <Text style={styles.slideNumber}>Slide {slide.id}</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Icon name={isEditing ? 'check' : 'edit'} size={20} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.slideTitle}>{slide.title}</Text>
      
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editedContent}
          onChangeText={setEditedContent}
          multiline
          numberOfLines={4}
        />
      ) : (
        <Text style={styles.slideContent}>{slide.content}</Text>
      )}
      
      {isEditing && (
        <View style={styles.editButtons}>
          <TouchableOpacity onPress={saveEdit} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsEditing(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {slide.metrics && (
        <View style={styles.metrics}>
          {slide.metrics.map((metric, idx) => (
            <View key={idx} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
```

---

#### 5. **Format Selection (PPT/PDF/Shark)**

**Web**
```javascript
<div className="grid sm:grid-cols-3">
  <button onClick={() => setType('ppt')}>PowerPoint</button>
  <button onClick={() => setType('pdf')}>PDF</button>
  <button onClick={() => setType('shark-ppt')}>Shark PPT</button>
</div>
```

**React Native**
```javascript
import { View, TouchableOpacity, Text, Image } from 'react-native';

const FormatSelector = ({ selected, onSelect }) => {
  const formats = [
    { id: 'ppt', name: 'PowerPoint', icon: 'file-presentation' },
    { id: 'pdf', name: 'PDF Document', icon: 'file-text' },
    { id: 'shark-ppt', name: 'Shark PPT', icon: 'briefcase', isNew: true },
  ];

  return (
    <View style={styles.formatGrid}>
      {formats.map(format => (
        <TouchableOpacity
          key={format.id}
          style={[
            styles.formatCard,
            selected === format.id && styles.selectedFormat
          ]}
          onPress={() => onSelect(format.id)}
        >
          {format.id === 'shark-ppt' ? (
            <Image 
              source={require('./assets/shark.png')} 
              style={styles.sharkIcon} 
            />
          ) : (
            <Icon name={format.icon} size={32} />
          )}
          
          <View style={styles.formatInfo}>
            <View style={styles.formatHeader}>
              <Text style={styles.formatName}>{format.name}</Text>
              {format.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>NEW</Text>
                </View>
              )}
            </View>
            <Text style={styles.formatDesc}>
              {format.id === 'shark-ppt' ? 'Investor pitch deck' : 'Document'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

---

#### 6. **Loading States**

**Web**
```javascript
{isGenerating && (
  <div className="flex items-center gap-2">
    <Loader2 className="animate-spin" />
    <span>Generating...</span>
  </div>
)}
```

**React Native**
```javascript
import { ActivityIndicator, View, Text } from 'react-native';

{isGenerating && (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#6366f1" />
    <Text style={styles.loadingText}>
      Generating your {contentType === 'shark-ppt' ? 'pitch deck' : 'content'}...
    </Text>
    <Text style={styles.loadingSubtext}>
      This may take 10-15 seconds
    </Text>
  </View>
)}
```

---

## � PPT Generation Flow in React Native

### Complete Download Button Implementation

When user clicks the **Download** button in React Native, here's the complete flow:

#### Architecture Overview
```
User clicks Download
  ↓
Send content + template to Backend API
  ↓
Backend generates PPT using PptxGenJS
  ↓
Backend uploads PPT to Cloud Storage (S3/Firebase)
  ↓
Backend returns download URL
  ↓
Mobile app downloads file using RNFS
  ↓
Mobile app shares file or saves to device
  ↓
User can open/share PPT
```

### Step-by-Step Implementation

#### 1. Backend API Endpoint (Node.js Example)

```javascript
// server.js (Node.js + Express)
const express = require('express');
const PptxGenJS = require('pptxgenjs');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const app = express();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

app.post('/api/generate-ppt', async (req, res) => {
  try {
    const { content, title, template, type } = req.body;
    
    // Create PPT
    const pptx = new PptxGenJS();
    pptx.author = 'IGYAN Content Generator';
    pptx.title = title;
    pptx.defineLayout({ name: 'WIDESCREEN', width: 10, height: 5.625 });
    pptx.layout = 'WIDESCREEN';
    
    // Parse content based on type
    let slides;
    if (type === 'shark-ppt') {
      const parsed = JSON.parse(content);
      slides = parsed.slides || [];
      
      // Generate Shark PPT (5-slide investor pitch)
      await generateSharkPPT(pptx, slides, title, template);
    } else {
      // Generate Standard PPT (educational)
      await generateStandardPPT(pptx, content, title, template);
    }
    
    // Save PPT to temp file
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pptx`;
    const tempPath = path.join('/tmp', fileName);
    
    await pptx.writeFile({ fileName: tempPath });
    
    // Upload to S3 (or any cloud storage)
    const fileContent = fs.readFileSync(tempPath);
    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: `presentations/${fileName}`,
      Body: fileContent,
      ContentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ACL: 'public-read', // Or use signed URLs for private files
    };
    
    const uploadResult = await s3.upload(s3Params).promise();
    
    // Clean up temp file
    fs.unlinkSync(tempPath);
    
    // Return download URL
    res.json({
      success: true,
      downloadUrl: uploadResult.Location,
      fileName: fileName,
      fileSize: fileContent.length,
    });
    
  } catch (error) {
    console.error('PPT Generation Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Generate Shark PPT function
async function generateSharkPPT(pptx, slides, title, template) {
  // Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: template.colors.primary };
  
  titleSlide.addText(title, {
    x: 0.5, y: 1.8, w: 9, h: 1.2,
    fontSize: template.fontSizes.title,
    bold: true, color: 'FFFFFF', align: 'center',
  });
  
  // Content Slides (5 slides)
  slides.forEach((slideData, index) => {
    const slide = pptx.addSlide();
    slide.background = { color: template.colors.background };
    
    // Left accent bar
    slide.addShape('rect', {
      x: 0, y: 0, w: 0.15, h: 5.625,
      fill: { color: template.colors.primary },
    });
    
    // Slide title
    slide.addText(slideData.title, {
      x: 1.0, y: 0.2, w: 6.5, h: 0.6,
      fontSize: template.fontSizes.heading,
      bold: true, color: template.colors.primary,
    });
    
    // Subtitle
    if (slideData.subtitle) {
      slide.addText(slideData.subtitle, {
        x: 1.0, y: 0.75, w: 6.5, h: 0.35,
        fontSize: 12, color: template.colors.secondary, italic: true,
      });
    }
    
    // Content bullets
    const bullets = slideData.content.split('\n').filter(l => l.trim()).map(line => ({
      text: line.replace(/^[-•]\s*/, '').trim(),
      options: { bullet: { type: 'bullet', color: template.colors.accent } }
    }));
    
    slide.addText(bullets, {
      x: 1.0, y: 1.35, w: 8.5, h: 2.8,
      fontSize: template.fontSizes.body, color: template.colors.text,
    });
    
    // Metrics (if any)
    if (slideData.metrics && slideData.metrics.length > 0) {
      const metricWidth = 8.5 / slideData.metrics.length;
      slideData.metrics.forEach((metric, mIdx) => {
        const xPos = 1.0 + mIdx * metricWidth;
        
        slide.addShape('roundRect', {
          x: xPos, y: 4.3, w: metricWidth - 0.2, h: 1.0,
          fill: { color: template.colors.accent }, rectRadius: 0.1,
        });
        
        slide.addText(metric.value, {
          x: xPos, y: 4.4, w: metricWidth - 0.2, h: 0.5,
          fontSize: 18, bold: true, color: 'FFFFFF', align: 'center',
        });
        
        slide.addText(metric.label, {
          x: xPos, y: 4.85, w: metricWidth - 0.2, h: 0.35,
          fontSize: 10, color: 'FFFFFF', align: 'center',
        });
      });
    }
  });
  
  // Thank You Slide
  const thankYouSlide = pptx.addSlide();
  thankYouSlide.background = { color: template.colors.primary };
  thankYouSlide.addText('Thank You!', {
    x: 0.5, y: 2.2, w: 9, h: 0.8,
    fontSize: 44, bold: true, color: 'FFFFFF', align: 'center',
  });
}

app.listen(3001, () => console.log('Server running on port 3001'));
```

#### 2. React Native Frontend - Download Button Handler

```javascript
// screens/ContentGeneratorScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import axios from 'axios';

const ContentGeneratorScreen = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  const API_BASE_URL = 'https://your-backend.com';

  // Request storage permission (Android)
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to save the presentation',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Main download handler
  const handleDownload = async () => {
    // Check permission
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot save file without storage permission');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Step 1: Send content to backend for PPT generation
      console.log('Sending content to backend...');
      
      const response = await axios.post(
        `${API_BASE_URL}/api/generate-ppt`,
        {
          content: generatedContent.content, // From OpenAI
          title: generatedContent.title,
          template: selectedTemplate, // Selected by user
          type: contentType, // 'ppt', 'pdf', or 'shark-ppt'
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 60000, // 60 seconds timeout
        }
      );

      if (!response.data.success) {
        throw new Error('Failed to generate presentation');
      }

      const { downloadUrl, fileName } = response.data;
      console.log('PPT generated, download URL:', downloadUrl);

      // Step 2: Download the PPT file to device
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      console.log('Downloading file to:', downloadDest);
      
      const downloadResult = RNFS.downloadFile({
        fromUrl: downloadUrl,
        toFile: downloadDest,
        background: true,
        discretionary: true,
        progressDivider: 10,
        begin: (res) => {
          console.log('Download started, total bytes:', res.contentLength);
        },
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          setDownloadProgress(Math.floor(progress));
          console.log(`Download progress: ${progress.toFixed(0)}%`);
        },
      });

      const result = await downloadResult.promise;

      if (result.statusCode === 200) {
        console.log('Download successful!');
        setDownloadProgress(100);
        
        // Step 3: Share or Save the file
        await shareOrSaveFile(downloadDest, fileName);
        
        Alert.alert(
          'Success! 🎉',
          'Your presentation has been downloaded successfully!',
          [
            {
              text: 'OK',
              onPress: () => setDownloadProgress(0),
            },
          ]
        );
      } else {
        throw new Error(`Download failed with status: ${result.statusCode}`);
      }
      
    } catch (error) {
      console.error('Download error:', error);
      
      let errorMessage = 'Failed to download presentation. Please try again.';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your internet connection.';
      } else if (error.response) {
        errorMessage = error.response.data?.error || 'Server error occurred.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Download Failed', errorMessage);
      setDownloadProgress(0);
    } finally {
      setIsDownloading(false);
    }
  };

  // Share or save file
  const shareOrSaveFile = async (filePath, fileName) => {
    try {
      const shareOptions = {
        title: 'Share Presentation',
        message: 'Check out this presentation!',
        url: `file://${filePath}`,
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        subject: fileName,
        failOnCancel: false,
      };
      
      const result = await Share.open(shareOptions);
      
      if (result.success) {
        console.log('File shared successfully');
      }
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Share error:', error);
        // If share fails, file is still saved in DocumentDirectory
        Alert.alert(
          'File Saved',
          `Presentation saved to: ${RNFS.DocumentDirectoryPath}/${fileName}`
        );
      }
    }
  };

  // Copy file to Downloads folder (Android only)
  const copyToDownloads = async (sourcePath, fileName) => {
    if (Platform.OS === 'android') {
      try {
        const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        await RNFS.copyFile(sourcePath, destPath);
        console.log('File copied to Downloads folder:', destPath);
        return destPath;
      } catch (error) {
        console.error('Copy to Downloads error:', error);
      }
    }
    return sourcePath;
  };

  return (
    <View style={styles.container}>
      {/* Download Button */}
      <TouchableOpacity
        style={[
          styles.downloadButton,
          isDownloading && styles.downloadButtonDisabled,
        ]}
        onPress={handleDownload}
        disabled={isDownloading || !generatedContent}
      >
        {isDownloading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={styles.buttonText}>
              {downloadProgress < 50 
                ? `Generating... ${downloadProgress}%`
                : `Downloading... ${downloadProgress}%`
              }
            </Text>
          </View>
        ) : (
          <>
            <Icon name="download" size={20} color="#fff" />
            <Text style={styles.buttonText}>Download PPT</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Bar */}
      {isDownloading && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${downloadProgress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{downloadProgress}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  downloadButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0.1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    width: 40,
    textAlign: 'right',
  },
});

export default ContentGeneratorScreen;
```

#### 3. Alternative: Firebase Storage

If using Firebase instead of AWS S3:

```javascript
// Backend (Node.js with Firebase)
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-app.appspot.com',
});

const bucket = getStorage().bucket();

// Upload PPT to Firebase Storage
async function uploadToFirebase(tempPath, fileName) {
  const destination = `presentations/${fileName}`;
  
  await bucket.upload(tempPath, {
    destination: destination,
    metadata: {
      contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    },
  });
  
  // Get signed URL (valid for 1 hour)
  const file = bucket.file(destination);
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  });
  
  return url;
}
```

#### 4. Error Handling Best Practices

```javascript
// Comprehensive error handling
const handleDownloadWithRetry = async (maxRetries = 3) => {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      await handleDownload();
      return; // Success
    } catch (error) {
      attempt++;
      
      if (attempt >= maxRetries) {
        Alert.alert(
          'Download Failed',
          `Failed after ${maxRetries} attempts. Please try again later.`,
          [
            { text: 'Retry', onPress: () => handleDownloadWithRetry() },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
        return;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      console.log(`Retrying download, attempt ${attempt + 1}...`);
    }
  }
};
```

#### 5. Offline Support with Caching

```javascript
// Cache downloaded files
import AsyncStorage from '@react-native-async-storage/async-storage';

const cacheDownloadedFile = async (fileName, filePath) => {
  try {
    const cached = await AsyncStorage.getItem('downloaded_files');
    const files = cached ? JSON.parse(cached) : [];
    
    files.push({
      name: fileName,
      path: filePath,
      timestamp: Date.now(),
    });
    
    await AsyncStorage.setItem('downloaded_files', JSON.stringify(files));
  } catch (error) {
    console.error('Cache error:', error);
  }
};

// View cached files
const viewCachedFiles = async () => {
  const cached = await AsyncStorage.getItem('downloaded_files');
  const files = cached ? JSON.parse(cached) : [];
  
  // Show list of previously downloaded files
  return files;
};
```

### Quick Reference: Download Flow

```
┌─────────────────────────────────────────────────────────┐
│  React Native App - User clicks Download Button         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  1. Send POST request to backend API                    │
│     Body: { content, title, template, type }            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  2. Backend generates PPT using PptxGenJS               │
│     - Parse content (standard or shark-ppt)             │
│     - Create slides with template styling               │
│     - Save to temp file                                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  3. Backend uploads PPT to Cloud Storage                │
│     - AWS S3 or Firebase Storage                        │
│     - Generate public or signed URL                     │
│     - Delete temp file                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  4. Backend returns download URL to app                 │
│     Response: { downloadUrl, fileName }                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  5. App downloads file using RNFS                       │
│     - Progress tracking                                 │
│     - Save to DocumentDirectory                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  6. App shares file or saves to Downloads               │
│     - Use Share API to open share sheet                 │
│     - Or copy to Downloads folder (Android)             │
└─────────────────────────────────────────────────────────┘
```

---

## �📁 Suggested React Native Project Structure

```
content-generator-mobile/
├── src/
│   ├── screens/
│   │   ├── ContentGeneratorScreen.js  (Main screen)
│   │   └── PreviewScreen.js           (Document preview)
│   ├── components/
│   │   ├── TemplateSelector.js        (Template picker)
│   │   ├── FormatSelector.js          (PPT/PDF/Shark selector)
│   │   ├── SlidePreview.js            (Shark slide view)
│   │   ├── EditableSlide.js           (Editable slide card)
│   │   └── LoadingIndicator.js        (Generation loading)
│   ├── services/
│   │   ├── openai.js                  (OpenAI API calls)
│   │   ├── documentGenerator.js       (Backend API calls)
│   │   └── fileDownload.js            (Download & share)
│   ├── utils/
│   │   ├── prompts.js                 (AI prompts)
│   │   └── templates.js               (2 templates)
│   ├── constants/
│   │   └── config.js                  (API URLs, keys)
│   └── navigation/
│       └── AppNavigator.js
├── App.js
└── package.json
```

---

## 🚀 React Native Implementation Checklist

### Phase 1: Setup
- [ ] Initialize RN project (`expo init` or `react-native init`)
- [ ] Install dependencies:
  ```bash
  npm install axios
  npm install @react-native-async-storage/async-storage
  npm install react-native-fs
  npm install react-native-share
  npm install @expo/vector-icons
  npm install react-native-webview (if using WebView approach)
  ```
- [ ] Set up environment variables
- [ ] Configure navigation

### Phase 2: Backend Setup (Recommended)
- [ ] Create Node.js/Python backend
- [ ] Install pptxgenjs, jspdf on server
- [ ] Create `/api/generate-document` endpoint
- [ ] Implement PPT generation logic
- [ ] Implement PDF generation logic
- [ ] Implement Shark PPT generation logic
- [ ] Set up cloud storage (S3/Firebase)
- [ ] Return download URLs

### Phase 3: Core Functionality
- [ ] OpenAI integration (same as web)
- [ ] Text input component
- [ ] Format selector (3 options)
- [ ] Template selector (2 templates)
- [ ] Generate button + loading state
- [ ] Content state management

### Phase 4: Shark PPT Features
- [ ] Slide preview component
- [ ] Editable slide fields
- [ ] Metric editing
- [ ] Save/cancel edit functionality
- [ ] Slide navigation

### Phase 5: Document Download
- [ ] Backend API integration
- [ ] File download with RNFS
- [ ] Progress indicator
- [ ] Share functionality
- [ ] Error handling

### Phase 6: UI/UX
- [ ] Professional styling
- [ ] Loading animations
- [ ] Success/error alerts
- [ ] Template preview cards
- [ ] Responsive layout

### Phase 7: Polish
- [ ] Error boundaries
- [ ] Offline support (cache)
- [ ] Analytics
- [ ] Testing
- [ ] Performance optimization

---

## 💡 Pro Tips for React Native

1. **Use Backend for Document Generation** - Browser libraries don't work in RN
2. **Implement Progress Indicators** - Downloads can take time
3. **Add Retry Logic** - Network failures are common
4. **Cache OpenAI Responses** - Reduce API costs
5. **Use Share API** - Better UX than just downloading
6. **Add File Previews** - Use react-native-pdf or WebView
7. **Optimize for Both Platforms** - iOS/Android have different file systems
8. **Implement Error Tracking** - Monitor generation failures
9. **Add Usage Analytics** - Track which formats are popular
10. **Consider Offline Mode** - Save drafts locally

---

## 📚 Additional Resources

- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [PptxGenJS Documentation](https://gitbrent.github.io/PptxGenJS/)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [React Native FS](https://github.com/itinance/react-native-fs)
- [React Native Share](https://github.com/react-native-share/react-native-share)

---

## 📝 Template Configuration

### Professional Template
```javascript
{
  id: 'professional',
  name: 'Professional',
  colors: {
    primary: '4472C4',      // Blue
    secondary: '5B9BD5',    // Light Blue
    text: '333333',         // Dark Gray
    background: 'FFFFFF',   // White
    accent: 'ED7D31',       // Orange
  },
  fontSizes: {
    title: 44,
    heading: 32,
    body: 18,
  },
}
```

### Vibrant Template
```javascript
{
  id: 'vibrant',
  name: 'Vibrant',
  colors: {
    primary: 'FF6B6B',      // Red
    secondary: '4ECDC4',    // Teal
    text: '2C3E50',         // Dark Blue
    background: 'FFFFFF',   // White
    accent: 'FFE66D',       // Yellow
  },
  fontSizes: {
    title: 44,
    heading: 32,
    body: 18,
  },
}
```

---

**Built with ❤️ for educators and entrepreneurs**
