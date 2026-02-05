<!-- # Teacher Prep - AI-Powered Teacher Preparation Quiz System

## 📋 Table of Contents
- [Overview](#overview)
- [How It Works](#how-it-works)
- [System Architecture](#system-architecture)
- [Core Features](#core-features)
- [Component Breakdown](#component-breakdown)
- [Data Flow](#data-flow)
- [React Native Migration Guide](#react-native-migration-guide)
- [Implementation Checklist](#implementation-checklist)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Pro Tips](#pro-tips)

---

## 🎯 Overview

**Teacher Prep** is an AI-powered quiz generation system designed specifically for **teacher preparation**. Unlike student quizzes, this tool focuses on helping teachers master content knowledge, develop teaching strategies, and practice handling classroom scenarios before entering the classroom.

### Key Differentiators
- **For Teachers, Not Students**: Questions focus on pedagogy, teaching strategies, and classroom management
- **Three Preparation Types**: Content knowledge, teaching strategies, and classroom scenarios
- **AI-Generated Content**: Uses OpenAI GPT-4o to create customized preparation materials
- **Instant Feedback**: Detailed explanations with practical teaching tips
- **Progressive Difficulty**: From foundational concepts to advanced pedagogical techniques

### Use Cases
- Pre-lesson preparation for new topics
- Professional development and skill enhancement
- Practice handling difficult student questions
- Master teaching methodologies and strategies
- Prepare for classroom challenges and scenarios

---

## ⚙️ How It Works

### User Journey Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEACHER PREP WORKFLOW                        │
└─────────────────────────────────────────────────────────────────┘

1. SETUP PHASE
   ├─ Teacher enters topic to teach (required)
   ├─ Selects preparation type:
   │  ├─ Content Knowledge Mastery
   │  ├─ Teaching Strategies & Methods
   │  └─ Classroom Scenarios & Challenges
   ├─ Chooses difficulty (foundational/intermediate/advanced)
   ├─ Selects question count (5/7/10)
   └─ Optionally adds specific focus area

2. GENERATION PHASE
   ├─ System constructs specialized prompt for OpenAI
   ├─ API calls GPT-4o with teacher-focused instructions
   ├─ AI generates JSON-formatted quiz with:
   │  ├─ Pedagogically-relevant questions
   │  ├─ Multiple choice options (A, B, C, D)
   │  ├─ Correct answers
   │  └─ Teaching-focused explanations
   └─ Quiz data parsed and displayed

3. PREVIEW PHASE
   ├─ Quiz overview card shows:
   │  ├─ Quiz title and description
   │  ├─ Question count
   │  ├─ Difficulty level
   │  └─ Estimated time (~2 min per question)
   └─ Teacher can start quiz or generate new topic

4. QUIZ PHASE
   ├─ Progress tracker shows completion percentage
   ├─ Questions displayed one at a time
   ├─ For each question:
   │  ├─ Teacher selects answer
   │  ├─ Instant feedback (correct/incorrect)
   │  ├─ Detailed explanation with teaching insights
   │  └─ Option to navigate previous/next
   └─ Continue until all questions answered

5. RESULTS PHASE
   ├─ Performance summary with percentage score
   ├─ Breakdown of correct vs incorrect answers
   ├─ Question-by-question review with status icons
   ├─ Options to:
   │  ├─ Review all answers with explanations
   │  └─ Generate new quiz on different topic
   └─ Motivational feedback based on performance
```

### Preparation Types Explained

#### 1. **Content Knowledge Mastery**
- Deep subject matter understanding
- Conceptual frameworks and relationships
- Advanced topic knowledge beyond student level
- Historical context and real-world applications

**Example Question:**
> "When teaching photosynthesis, which conceptual framework best helps students understand the energy transformation process?"

#### 2. **Teaching Strategies & Methods**
- Pedagogical approaches and techniques
- Student engagement strategies
- Effective explanation methods
- Differentiation and scaffolding techniques

**Example Question:**
> "Which instructional strategy is most effective for introducing abstract mathematical concepts to visual learners?"

#### 3. **Classroom Scenarios & Challenges**
- Handling difficult student questions
- Addressing common misconceptions
- Managing classroom dynamics
- Real-world teaching situations

**Example Question:**
> "A student asks: 'Why do we need to learn this?' What's the most pedagogically sound response for motivating engagement?"

---

## 🏗️ System Architecture

### Technology Stack

```
┌────────────────────────────────────────────────────────────┐
│                    CURRENT WEB STACK                       │
├────────────────────────────────────────────────────────────┤
│ Frontend Framework:  Next.js 14+ (App Router)             │
│ UI Library:          React 18+                             │
│ Styling:             Tailwind CSS + CSS Variables          │
│ State Management:    React Hooks (useState, useEffect)     │
│ Routing:             Next.js App Router (useRouter)        │
│ Authentication:      Custom Auth Context (useAuth)         │
│ AI Engine:           OpenAI API (GPT-4o)                   │
│ HTTP Client:         Native Fetch API                      │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                  TARGET MOBILE STACK                       │
├────────────────────────────────────────────────────────────┤
│ Framework:           React Native                          │
│ Navigation:          React Navigation 6+                   │
│ State Management:    React Hooks + Context API             │
│ Styling:             StyleSheet / Styled Components        │
│ HTTP Client:         Axios / Fetch API                     │
│ Storage:             AsyncStorage                          │
│ Theme:               React Native Paper / Custom           │
└────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM                        │
└─────────────────────────────────────────────────────────────┘

USER INPUT                    STATE MANAGEMENT
┌────────┐                   ┌─────────────────┐
│ Setup  │──────────────────▶│   formData      │
│ Form   │  onChange         │   - topic       │
└────────┘                   │   - prepType    │
                             │   - difficulty  │
                             │   - count       │
                             │   - focusArea   │
                             └────────┬────────┘
                                      │ onSubmit
                                      ▼
                             ┌─────────────────┐
                             │  OpenAI API     │◀──── API_KEY
                             │  (GPT-4o)       │
                             │  - Prompt       │
                             │  - Model Config │
                             └────────┬────────┘
                                      │ JSON Response
                                      ▼
                             ┌─────────────────┐
                             │  Quiz State     │
                             │  - title        │
                             │  - description  │
                             │  - questions[]  │
                             └────────┬────────┘
                                      │
                   ┌──────────────────┼──────────────────┐
                   ▼                  ▼                  ▼
         ┌───────────────┐  ┌──────────────┐  ┌───────────────┐
         │ Quiz Preview  │  │ Quiz Session │  │ Quiz Results  │
         │  - Overview   │  │  - Questions │  │  - Score      │
         │  - Stats      │  │  - Progress  │  │  - Breakdown  │
         └───────────────┘  │  - Answers   │  └───────────────┘
                            └──────────────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │ userAnswers{}   │
                           │ - questionId    │
                           │ - selectedId    │
                           └─────────────────┘
```

---

## 🎨 Core Features

### 1. **Dynamic Quiz Generation**
- **Real-time AI Generation**: Creates unique quizzes on-demand
- **Teacher-Specific Focus**: Questions tailored for educator preparation
- **Customizable Parameters**: Topic, type, difficulty, question count
- **JSON Response Parsing**: Structured data format for consistency

### 2. **Three Preparation Modes**

| Mode | Focus | Example Topics |
|------|-------|----------------|
| **Content Knowledge** | Subject mastery | Photosynthesis mechanisms, Quadratic formula derivations |
| **Teaching Strategies** | Pedagogy | Scaffolding techniques, Differentiation methods |
| **Classroom Scenarios** | Practical challenges | Handling misconceptions, Student motivation |

### 3. **Progressive Question Flow**
- One question at a time (focused preparation)
- Answer locks after selection (prevents changing)
- Instant feedback with explanations
- Navigation between questions (review capability)
- Progress tracking (visual completion indicator)

### 4. **Comprehensive Feedback System**
- ✅ **Correct Answers**: Green highlight + checkmark icon
- ❌ **Incorrect Answers**: Red highlight + X icon
- 📚 **Explanations**: Detailed teaching insights for every answer
- 💡 **Teaching Tips**: Practical advice embedded in explanations

### 5. **Results Dashboard**
- Percentage score calculation
- Correct vs incorrect breakdown
- Question-by-question review list
- Performance-based messaging:
  - 90%+: "Outstanding preparation!"
  - 70-89%: "Great teaching readiness!"
  - 50-69%: "Good effort, review key areas"
  - <50%: "Keep preparing, you've got this!"

### 6. **Authentication & Protection**
- User authentication required (via `useAuth` context)
- Redirects to login if unauthenticated
- Loading state handling during auth check
- Session persistence across navigation

---

## 🧩 Component Breakdown

### Main Page Component: `TeacherPrepPage.js`

**Purpose**: Root component managing entire teacher prep quiz lifecycle

**Key Responsibilities**:
- Form input handling and validation
- OpenAI API communication
- State orchestration across all quiz phases
- Navigation and routing
- Authentication guard

**State Variables**:
```javascript
const [formData, setFormData] = useState({
  topic: "",              // Subject to prepare for
  difficulty: "medium",   // foundational/intermediate/advanced
  questionCount: "5",     // 5/7/10 questions
  focusArea: "",         // Optional specific focus
  prepType: "knowledge"   // knowledge/teaching-strategies/classroom-scenarios
});

const [generating, setGenerating] = useState(false);      // Loading state
const [quiz, setQuiz] = useState(null);                   // Generated quiz data
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [userAnswers, setUserAnswers] = useState({});       // {questionId: answerId}
const [showResults, setShowResults] = useState(false);    // Results view toggle
const [quizStarted, setQuizStarted] = useState(false);    // Quiz session active
const [error, setError] = useState("");                   // Error messaging
```

**Key Methods**:

| Method | Purpose | Trigger |
|--------|---------|---------|
| `handleSubmit()` | Generate quiz via OpenAI API | Form submission |
| `handleInputChange()` | Update form state | Input change events |
| `handleStartQuiz()` | Begin quiz session | "Begin Preparation" button |
| `handleAnswerSelect()` | Record user answer | Option button click |
| `handleNextQuestion()` | Navigate to next question | "Next" button |
| `handlePreviousQuestion()` | Navigate to previous question | "Previous" button |
| `handleRestartQuiz()` | Reset and create new quiz | "New Topic" button |
| `calculateScore()` | Compute quiz results | Real-time calculation |

### Child Component 1: `QuizQuestion.js`

**Purpose**: Display individual question with answer options and feedback

**Props Interface**:
```typescript
interface QuizQuestionProps {
  question: {
    id: number;
    question: string;
    options: Array<{id: string, text: string}>;
    correctAnswer: string;
    explanation: string;
  };
  questionNumber: number;
  selectedAnswer: string | null;
  onAnswerSelect: (questionId: number, answerId: string) => void;
}
```

**Features**:
- **Dynamic Styling**: Changes based on answer state (unanswered/correct/incorrect)
- **Visual Feedback**: Color-coded options (green=correct, red=incorrect)
- **Icon Indicators**: Checkmarks for correct, X for incorrect
- **Delayed Explanation**: Shows after 300ms delay when answer selected
- **Disabled State**: Locks options after answer selection

**Styling Logic**:
```javascript
getOptionClass(optionId):
  - Not answered: White background, hover effects
  - Correct: Green border and background
  - Incorrect (selected): Red border and background
  - Other options (after answer): Dimmed opacity

getOptionIcon(optionId):
  - Correct: Green checkmark icon
  - Incorrect (selected): Red X icon
  - Others: No icon
```

### Child Component 2: `QuizResults.js`

**Purpose**: Display comprehensive quiz results and performance analysis

**Props Interface**:
```typescript
interface QuizResultsProps {
  quiz: QuizData;
  userAnswers: {[questionId: number]: string};
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  onRestartQuiz: () => void;
  onReviewAnswers: () => void;
}
```

**Features**:
- **Circular Progress Indicator**: SVG-based score visualization
- **Performance Messaging**: Dynamic feedback based on score percentage
- **Color-Coded Themes**: Visual theme changes with performance level
- **Stats Grid**: Correct/Incorrect/Total breakdown
- **Question List**: Individual question status with icons
- **Action Buttons**: Review answers or create new quiz

**Performance Tiers**:
```javascript
90%+   → "Outstanding!" (Emerald theme)
70-89% → "Great Job!"   (Blue theme)
50-69% → "Good Effort!" (Amber theme)
<50%   → "Keep Learning!" (Orange theme)
```

---

## 📊 Data Flow

### Quiz Generation Flow

```javascript
// 1. Form Submission
handleSubmit(e) → {
  // 2. Reset all state
  setGenerating(true)
  setQuiz(null)
  setUserAnswers({})
  setError("")
  
  // 3. Construct AI prompt with prep type instructions
  const prompt = `Generate ${questionCount}-question quiz for TEACHER PREPARATION...
    Preparation Type: ${prepType}
    ${prepTypeInstructions}  // Custom instructions per type
    ...`
  
  // 4. Call OpenAI API
  fetch("https://api.openai.com/v1/chat/completions", {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Expert teacher educator..." },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  })
  
  // 5. Parse JSON response
  const parsedData = JSON.parse(response)
  
  // 6. Update quiz state
  setQuiz(parsedData)
  setGenerating(false)
}
```

### Answer Selection Flow

```javascript
// 1. User clicks option
handleAnswerSelect(questionId, answerId) → {
  // 2. Check if already answered (prevent change)
  if (userAnswers[questionId]) return;
  
  // 3. Record answer in state
  setUserAnswers(prev => ({
    ...prev,
    [questionId]: answerId
  }))
  
  // 4. QuizQuestion component detects selectedAnswer prop change
  useEffect(() → {
    if (selectedAnswer) {
      // 5. Show explanation after 300ms delay
      setTimeout(() => setShowExplanation(true), 300)
    }
  }, [selectedAnswer])
}
```

### Navigation Flow

```javascript
// Previous Question
handlePreviousQuestion() → {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(prev => prev - 1)
  }
}

// Next Question / Finish
handleNextQuestion() → {
  if (currentQuestionIndex < quiz.questions.length - 1) {
    // Navigate to next question
    setCurrentQuestionIndex(prev => prev + 1)
  } else {
    // Show results page
    setShowResults(true)
  }
}
```

### Score Calculation

```javascript
calculateScore() → {
  let correct = 0;
  
  // Compare each answer to correct answer
  quiz.questions.forEach(question => {
    if (userAnswers[question.id] === question.correctAnswer) {
      correct++;
    }
  });
  
  const total = quiz.questions.length;
  const percentage = Math.round((correct / total) * 100);
  
  return { correct, total, percentage };
}
```

---

## 📱 React Native Migration Guide

### Step 1: Project Structure Setup

```
teacher-prep-mobile/
├── src/
│   ├── screens/
│   │   └── TeacherPrepScreen.js       # Main screen
│   ├── components/
│   │   ├── QuizSetupForm.js          # Setup form component
│   │   ├── QuizPreview.js            # Quiz overview card
│   │   ├── QuizQuestion.js           # Question display
│   │   ├── QuizResults.js            # Results dashboard
│   │   └── ProgressBar.js            # Progress indicator
│   ├── services/
│   │   └── openaiService.js          # API communication
│   ├── contexts/
│   │   └── AuthContext.js            # Authentication
│   ├── utils/
│   │   └── quizHelpers.js            # Helper functions
│   └── constants/
│       ├── colors.js                 # Theme colors
│       └── config.js                 # API keys
```

### Step 2: Install Required Dependencies

```bash
# Core Navigation
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-paper
npm install react-native-vector-icons
npm install react-native-linear-gradient

# State & Storage
npm install @react-native-async-storage/async-storage

# HTTP Requests
npm install axios

# Environment Variables
npm install react-native-dotenv
```

### Step 3: OpenAI Service Implementation

```javascript
// src/services/openaiService.js
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

export const generateTeacherPrepQuiz = async (formData) => {
  try {
    // Construct prep type instructions
    let prepTypeInstructions = '';
    if (formData.prepType === 'knowledge') {
      prepTypeInstructions = 'Focus on deep content knowledge, subject mastery...';
    } else if (formData.prepType === 'teaching-strategies') {
      prepTypeInstructions = 'Focus on pedagogical approaches, teaching methods...';
    } else if (formData.prepType === 'classroom-scenarios') {
      prepTypeInstructions = 'Focus on real classroom situations, handling questions...';
    }

    const prompt = `Generate a ${formData.questionCount}-question multiple choice quiz for TEACHER PREPARATION on: ${formData.topic}

Difficulty Level: ${formData.difficulty}
Preparation Type: ${formData.prepType}
${formData.focusArea ? `Focus Area: ${formData.focusArea}` : ''}

IMPORTANT: This quiz is for TEACHERS preparing to teach, not for students. ${prepTypeInstructions}

Requirements:
- Create exactly ${formData.questionCount} questions that help teachers prepare
- Each question should have 4 options (A, B, C, D)
- Only ONE option should be correct
- Provide detailed, educational explanations with teaching tips
- Make questions progressively challenging
- Include practical teaching scenarios when appropriate
- Difficulty: ${formData.difficulty === 'easy' ? 'foundational teaching concepts' : formData.difficulty === 'medium' ? 'effective teaching practices' : 'advanced pedagogical techniques'}

Return the response in this EXACT JSON format:
{
  "title": "Teacher Prep Quiz title",
  "description": "Brief description",
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": [
        {"id": "A", "text": "Option A"},
        {"id": "B", "text": "Option B"},
        {"id": "C", "text": "Option C"},
        {"id": "D", "text": "Option D"}
      ],
      "correctAnswer": "A",
      "explanation": "Detailed explanation with teaching insights"
    }
  ]
}

Provide ONLY valid JSON, no additional commentary.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an expert teacher educator and instructional coach. You create preparation materials that help teachers master content knowledge, develop effective teaching strategies, and handle classroom scenarios. Always return valid JSON responses with practical teaching insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const generatedContent = response.data.choices[0].message.content;
    return JSON.parse(generatedContent);
    
  } catch (error) {
    console.error('Error generating teacher prep quiz:', error);
    throw new Error('Failed to generate quiz. Please try again.');
  }
};
```

### Step 4: Main Screen Component

```javascript
// src/screens/TeacherPrepScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { generateTeacherPrepQuiz } from '../services/openaiService';
import QuizSetupForm from '../components/QuizSetupForm';
import QuizPreview from '../components/QuizPreview';
import QuizQuestion from '../components/QuizQuestion';
import QuizResults from '../components/QuizResults';
import ProgressBar from '../components/ProgressBar';

export default function TeacherPrepScreen({ navigation }) {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    topic: '',
    difficulty: 'medium',
    questionCount: '5',
    focusArea: '',
    prepType: 'knowledge'
  });
  const [generating, setGenerating] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigation.navigate('Login');
    }
  }, [user, loading, navigation]);

  const handleSubmit = async () => {
    if (!formData.topic.trim()) {
      Alert.alert('Error', 'Please enter a topic');
      return;
    }

    setGenerating(true);
    setQuiz(null);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizStarted(false);

    try {
      const generatedQuiz = await generateTeacherPrepQuiz(formData);
      setQuiz(generatedQuiz);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId, answerId) => {
    if (userAnswers[questionId]) return;
    
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setQuiz(null);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    if (!quiz) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    quiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    const total = quiz.questions.length;
    const percentage = Math.round((correct / total) * 100);
    
    return { correct, total, percentage };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const score = calculateScore();

  return (
    <ScrollView style={styles.container}>
      {!quiz && !generating && (
        <QuizSetupForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          generating={generating}
        />
      )}

      {generating && (
        <View style={styles.generatingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={styles.generatingText}>Crafting Your Prep Quiz...</Text>
        </View>
      )}

      {quiz && !quizStarted && !showResults && (
        <QuizPreview
          quiz={quiz}
          formData={formData}
          onStartQuiz={handleStartQuiz}
          onRestartQuiz={handleRestartQuiz}
        />
      )}

      {quiz && quizStarted && !showResults && currentQuestion && (
        <>
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={quiz.questions.length}
          />
          <QuizQuestion
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            selectedAnswer={userAnswers[currentQuestion.id]}
            onAnswerSelect={handleAnswerSelect}
          />
          <View style={styles.navigation}>
            <Button
              title="Previous"
              onPress={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            />
            <Button
              title={currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
              onPress={handleNextQuestion}
              disabled={!userAnswers[currentQuestion.id]}
            />
          </View>
        </>
      )}

      {showResults && (
        <QuizResults
          quiz={quiz}
          userAnswers={userAnswers}
          score={score}
          onRestartQuiz={handleRestartQuiz}
          onReviewAnswers={() => {
            setShowResults(false);
            setQuizStarted(true);
            setCurrentQuestionIndex(0);
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  generatingContainer: {
    padding: 40,
    alignItems: 'center'
  },
  generatingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600'
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  }
});
```

### Step 5: Quiz Setup Form Component

```javascript
// src/components/QuizSetupForm.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function QuizSetupForm({ formData, onInputChange, onSubmit, generating }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher Prep Quiz</Text>
      <Text style={styles.subtitle}>Test and enhance your teaching knowledge</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Topic to Teach *</Text>
        <TextInput
          style={styles.input}
          value={formData.topic}
          onChangeText={(value) => onInputChange('topic', value)}
          placeholder="E.g., Photosynthesis, Quadratic Equations..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Preparation Type *</Text>
        <Picker
          selectedValue={formData.prepType}
          onValueChange={(value) => onInputChange('prepType', value)}
          style={styles.picker}
        >
          <Picker.Item label="Content Knowledge Mastery" value="knowledge" />
          <Picker.Item label="Teaching Strategies & Methods" value="teaching-strategies" />
          <Picker.Item label="Classroom Scenarios & Challenges" value="classroom-scenarios" />
        </Picker>
        <Text style={styles.helperText}>
          {formData.prepType === 'knowledge' && 'Deep dive into subject matter and concepts'}
          {formData.prepType === 'teaching-strategies' && 'Explore effective pedagogical approaches'}
          {formData.prepType === 'classroom-scenarios' && 'Practice handling real teaching situations'}
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Specific Focus (Optional)</Text>
        <TextInput
          style={styles.input}
          value={formData.focusArea}
          onChangeText={(value) => onInputChange('focusArea', value)}
          placeholder="E.g., explaining to beginners..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Difficulty</Text>
          <Picker
            selectedValue={formData.difficulty}
            onValueChange={(value) => onInputChange('difficulty', value)}
            style={styles.picker}
          >
            <Picker.Item label="Foundational" value="easy" />
            <Picker.Item label="Intermediate" value="medium" />
            <Picker.Item label="Advanced" value="hard" />
          </Picker>
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Question Count</Text>
          <Picker
            selectedValue={formData.questionCount}
            onValueChange={(value) => onInputChange('questionCount', value)}
            style={styles.picker}
          >
            <Picker.Item label="5 Questions" value="5" />
            <Picker.Item label="7 Questions" value="7" />
            <Picker.Item label="10 Questions" value="10" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, generating && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={generating}
      >
        <Text style={styles.buttonText}>
          {generating ? 'Preparing Your Quiz...' : 'Generate Prep Quiz'}
        </Text>
      </TouchableOpacity>

      {/* Info Panel */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Why Teacher Prep?</Text>
        <Text style={styles.infoText}>
          Prepare yourself before entering the classroom. Test your knowledge, practice teaching strategies, and build confidence.
        </Text>
        <View style={styles.benefitsList}>
          <Text style={styles.benefit}>✓ Master content before teaching</Text>
          <Text style={styles.benefit}>✓ Learn effective teaching strategies</Text>
          <Text style={styles.benefit}>✓ Practice handling classroom scenarios</Text>
          <Text style={styles.benefit}>✓ Get instant feedback with teaching tips</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24
  },
  formGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF'
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20
  },
  halfWidth: {
    flex: 1
  },
  button: {
    backgroundColor: '#8B5CF6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  infoPanel: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12
  },
  benefitsList: {
    gap: 8
  },
  benefit: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  }
});
```

### Step 6: Quiz Question Component

```javascript
// src/components/QuizQuestion.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function QuizQuestion({ question, questionNumber, selectedAnswer, onAnswerSelect }) {
  const [showExplanation, setShowExplanation] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (selectedAnswer) {
      setTimeout(() => {
        setShowExplanation(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
      }, 300);
    } else {
      setShowExplanation(false);
      fadeAnim.setValue(0);
    }
  }, [selectedAnswer]);

  const getOptionStyle = (optionId) => {
    if (!selectedAnswer) {
      return styles.optionDefault;
    }

    const isCorrect = optionId === question.correctAnswer;
    const isSelected = optionId === selectedAnswer;

    if (isCorrect) {
      return styles.optionCorrect;
    }
    if (isSelected && !isCorrect) {
      return styles.optionIncorrect;
    }
    return styles.optionDimmed;
  };

  const getOptionIcon = (optionId) => {
    if (!selectedAnswer) return null;

    const isCorrect = optionId === question.correctAnswer;
    const isSelected = optionId === selectedAnswer;

    if (isCorrect) {
      return <Icon name="check-circle" size={24} color="#10B981" />;
    }
    if (isSelected && !isCorrect) {
      return <Icon name="close-circle" size={24} color="#EF4444" />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Question Header */}
      <View style={styles.header}>
        <View style={styles.questionNumber}>
          <Text style={styles.questionNumberText}>{questionNumber}</Text>
        </View>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.option, getOptionStyle(option.id)]}
            onPress={() => !selectedAnswer && onAnswerSelect(question.id, option.id)}
            disabled={!!selectedAnswer}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionLabel}>
                <Text style={styles.optionLabelText}>{option.id}</Text>
              </View>
              <Text style={styles.optionText}>{option.text}</Text>
              {getOptionIcon(option.id)}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Explanation */}
      {showExplanation && (
        <Animated.View
          style={[
            styles.explanationContainer,
            selectedAnswer === question.correctAnswer ? styles.explanationCorrect : styles.explanationIncorrect,
            { opacity: fadeAnim }
          ]}
        >
          <View style={styles.explanationHeader}>
            <Icon
              name={selectedAnswer === question.correctAnswer ? 'check-circle' : 'alert-circle'}
              size={24}
              color={selectedAnswer === question.correctAnswer ? '#10B981' : '#F59E0B'}
            />
            <Text style={styles.explanationTitle}>
              {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not Quite'}
            </Text>
          </View>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  questionNumber: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  questionNumberText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  questionText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 26
  },
  optionsContainer: {
    gap: 12
  },
  option: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16
  },
  optionDefault: {
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF'
  },
  optionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5'
  },
  optionIncorrect: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  optionDimmed: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    opacity: 0.6
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  optionLabel: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionLabelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#374151'
  },
  explanationContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2
  },
  explanationCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5'
  },
  explanationIncorrect: {
    borderColor: '#F59E0B',
    backgroundColor: '#FEF3C7'
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827'
  },
  explanationText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  }
});
```

### Step 7: Quiz Results Component

```javascript
// src/components/QuizResults.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';

export default function QuizResults({ quiz, userAnswers, score, onRestartQuiz, onReviewAnswers }) {
  const getPerformanceMessage = () => {
    if (score.percentage >= 90) {
      return {
        title: 'Outstanding! 🎉',
        message: "You've mastered this topic! Excellent work!",
        color: '#10B981'
      };
    } else if (score.percentage >= 70) {
      return {
        title: 'Great Job! 👏',
        message: 'You have a solid understanding. Keep it up!',
        color: '#3B82F6'
      };
    } else if (score.percentage >= 50) {
      return {
        title: 'Good Effort! 💪',
        message: "You're on the right track. Review and try again!",
        color: '#F59E0B'
      };
    } else {
      return {
        title: 'Keep Learning! 📚',
        message: "Don't give up! Review the material and retry.",
        color: '#F97316'
      };
    }
  };

  const performance = getPerformanceMessage();
  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference * (1 - score.percentage / 100);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Score Circle */}
        <View style={styles.scoreCircleContainer}>
          <Svg height="200" width="200">
            <Circle
              cx="100"
              cy="100"
              r="88"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            <Circle
              cx="100"
              cy="100"
              r="88"
              stroke={performance.color}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="100, 100"
            />
          </Svg>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scorePercentage}>{score.percentage}%</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
        </View>

        {/* Performance Message */}
        <View style={styles.performanceMessage}>
          <Text style={styles.performanceTitle}>{performance.title}</Text>
          <Text style={styles.performanceSubtitle}>{performance.message}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: performance.color }]}>{score.correct}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{score.total - score.correct}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{score.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Question Breakdown */}
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownTitle}>Question Breakdown</Text>
          {quiz.questions.map((question, index) => {
            const isCorrect = userAnswers[question.id] === question.correctAnswer;
            return (
              <View key={question.id} style={styles.questionRow}>
                <View style={[styles.questionBadge, isCorrect ? styles.questionCorrect : styles.questionIncorrect]}>
                  <Text style={styles.questionBadgeText}>{index + 1}</Text>
                </View>
                <Text style={styles.questionTitle} numberOfLines={1}>
                  {question.question}
                </Text>
                <Icon
                  name={isCorrect ? 'check-circle' : 'close-circle'}
                  size={24}
                  color={isCorrect ? '#10B981' : '#EF4444'}
                />
              </View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={onReviewAnswers}
          >
            <Icon name="eye" size={20} color="#8B5CF6" />
            <Text style={styles.buttonOutlineText}>Review Answers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary, { backgroundColor: performance.color }]}
            onPress={onRestartQuiz}
          >
            <Icon name="refresh" size={20} color="#FFFFFF" />
            <Text style={styles.buttonPrimaryText}>Try New Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6
  },
  scoreCircleContainer: {
    alignItems: 'center',
    marginVertical: 24,
    position: 'relative'
  },
  scoreTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827'
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600'
  },
  performanceMessage: {
    alignItems: 'center',
    marginBottom: 24
  },
  performanceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  performanceSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center'
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600'
  },
  breakdownContainer: {
    marginBottom: 24
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  questionBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionCorrect: {
    backgroundColor: '#10B981'
  },
  questionIncorrect: {
    backgroundColor: '#EF4444'
  },
  questionBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  questionTitle: {
    flex: 1,
    fontSize: 14,
    color: '#374151'
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
    backgroundColor: '#FFFFFF'
  },
  buttonOutlineText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonPrimary: {
    backgroundColor: '#8B5CF6'
  },
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
```

### Step 8: Progress Bar Component

```javascript
// src/components/ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Question {current} of {total}</Text>
        <Text style={styles.text}>{percentage}% Complete</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151'
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 6'
  }
});
```

### Step 9: Environment Configuration

```javascript
// .env
OPENAI_API_KEY=your_openai_api_key_here
```

```javascript
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }]
  ]
};
```

---

## ✅ Implementation Checklist

### Phase 1: Project Setup
- [ ] Create React Native project (`npx react-native init TeacherPrepApp`)
- [ ] Install all required dependencies
- [ ] Set up folder structure as outlined
- [ ] Configure environment variables (.env file)
- [ ] Set up navigation (React Navigation)

### Phase 2: Core Components
- [ ] Create AuthContext for user authentication
- [ ] Build OpenAI service module
- [ ] Implement TeacherPrepScreen (main screen)
- [ ] Build QuizSetupForm component
- [ ] Build QuizPreview component
- [ ] Build QuizQuestion component
- [ ] Build QuizResults component
- [ ] Build ProgressBar component

### Phase 3: Styling & UX
- [ ] Define color palette in constants
- [ ] Implement responsive layouts
- [ ] Add loading states and spinners
- [ ] Add error handling and alerts
- [ ] Test on different screen sizes
- [ ] Implement dark mode (optional)

### Phase 4: API Integration
- [ ] Test OpenAI API connection
- [ ] Handle API rate limiting
- [ ] Implement retry logic for failed requests
- [ ] Add request timeout handling
- [ ] Test with different quiz configurations

### Phase 5: State Management
- [ ] Implement quiz state persistence (AsyncStorage)
- [ ] Handle navigation state
- [ ] Manage answer state correctly
- [ ] Implement score calculation logic
- [ ] Test state transitions

### Phase 6: Testing & Optimization
- [ ] Test quiz generation flow
- [ ] Test answer selection and navigation
- [ ] Test results calculation
- [ ] Optimize re-renders (React.memo, useMemo)
- [ ] Test offline behavior
- [ ] Performance profiling

### Phase 7: Polish & Deploy
- [ ] Add app icon and splash screen
- [ ] Configure app metadata
- [ ] Test on iOS and Android
- [ ] Build release versions
- [ ] Submit to app stores

---

## 🔌 API Integration

### OpenAI API Request Structure

```javascript
{
  "model": "gpt-4o",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert teacher educator..."
    },
    {
      "role": "user",
      "content": "Generate quiz prompt..."
    }
  ],
  "temperature": 0.7,
  "max_tokens": 3000,
  "response_format": { "type": "json_object" }
}
```

### Expected JSON Response Format

```json
{
  "title": "Photosynthesis Teaching Preparation",
  "description": "Master content knowledge for teaching photosynthesis",
  "questions": [
    {
      "id": 1,
      "question": "Which pedagogical approach best explains light-dependent reactions?",
      "options": [
        {"id": "A", "text": "Direct instruction with diagrams"},
        {"id": "B", "text": "Inquiry-based lab exploration"},
        {"id": "C", "text": "Analogies using familiar processes"},
        {"id": "D", "text": "Memorization of chemical equations"}
      ],
      "correctAnswer": "C",
      "explanation": "Analogies help students connect abstract processes to familiar concepts. Comparing chloroplast reactions to solar panels or batteries makes the energy conversion tangible. This approach activates prior knowledge and builds conceptual understanding rather than rote memorization."
    }
  ]
}
```

### Error Handling

```javascript
try {
  const quiz = await generateTeacherPrepQuiz(formData);
  setQuiz(quiz);
} catch (error) {
  if (error.response?.status === 429) {
    Alert.alert('Rate Limit', 'Too many requests. Please wait a moment.');
  } else if (error.response?.status === 401) {
    Alert.alert('API Error', 'Invalid API key. Please check configuration.');
  } else if (error.code === 'ECONNABORTED') {
    Alert.alert('Timeout', 'Request took too long. Please try again.');
  } else {
    Alert.alert('Error', 'Failed to generate quiz. Please try again.');
  }
}
```

---

## 🧠 State Management

### State Variables Overview

| State | Type | Purpose | Initial Value |
|-------|------|---------|---------------|
| `formData` | Object | User quiz preferences | `{topic:'', difficulty:'medium', ...}` |
| `generating` | Boolean | API loading state | `false` |
| `quiz` | Object/null | Generated quiz data | `null` |
| `currentQuestionIndex` | Number | Active question | `0` |
| `userAnswers` | Object | Answer selections | `{}` |
| `showResults` | Boolean | Results view toggle | `false` |
| `quizStarted` | Boolean | Quiz session active | `false` |

### State Flow Diagram

```
Initial State → Setup Form → Generating → Quiz Preview → Quiz Session → Results
     ↑                                                                      ↓
     └──────────────────────────── Restart ───────────────────────────────┘
```

### AsyncStorage Implementation (Optional)

```javascript
// Save quiz state
const saveQuizState = async () => {
  try {
    await AsyncStorage.setItem('currentQuiz', JSON.stringify({
      quiz,
      userAnswers,
      currentQuestionIndex
    }));
  } catch (error) {
    console.error('Failed to save quiz state:', error);
  }
};

// Load quiz state
const loadQuizState = async () => {
  try {
    const savedState = await AsyncStorage.getItem('currentQuiz');
    if (savedState) {
      const { quiz, userAnswers, currentQuestionIndex } = JSON.parse(savedState);
      setQuiz(quiz);
      setUserAnswers(userAnswers);
      setCurrentQuestionIndex(currentQuestionIndex);
      setQuizStarted(true);
    }
  } catch (error) {
    console.error('Failed to load quiz state:', error);
  }
};
```

---

## 💡 Pro Tips

### 1. **API Cost Optimization**
```javascript
// Use GPT-3.5-turbo for development to save costs
const model = __DEV__ ? 'gpt-3.5-turbo' : 'gpt-4o';
```

### 2. **Offline Support**
```javascript
// Cache generated quizzes
const cacheQuiz = async (quiz) => {
  await AsyncStorage.setItem(`quiz_${Date.now()}`, JSON.stringify(quiz));
};

// Retrieve cached quizzes when offline
const getCachedQuizzes = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const quizKeys = keys.filter(key => key.startsWith('quiz_'));
  return await AsyncStorage.multiGet(quizKeys);
};
```

### 3. **Performance Optimization**
```javascript
// Memoize heavy calculations
const score = useMemo(() => calculateScore(), [quiz, userAnswers]);

// Prevent unnecessary re-renders
const QuizQuestion = React.memo(QuizQuestionComponent);
```

### 4. **Accessibility**
```javascript
<TouchableOpacity
  accessible={true}
  accessibilityLabel={`Option ${option.id}: ${option.text}`}
  accessibilityRole="radio"
  accessibilityState={{ checked: selectedAnswer === option.id }}
>
```

### 5. **Analytics Integration**
```javascript
// Track quiz completions
analytics().logEvent('quiz_completed', {
  topic: formData.topic,
  prepType: formData.prepType,
  score: score.percentage,
  difficulty: formData.difficulty
});
```

### 6. **Loading States**
```javascript
// Use skeleton screens instead of spinners for better UX
{generating && <QuizSkeleton />}
```

### 7. **Deep Linking**
```javascript
// Allow sharing specific quiz topics
Linking.createURL('teacherprep', {
  topic: 'Photosynthesis',
  prepType: 'knowledge'
});
```

---

## 🎯 Key Differences from Student Quizzes

| Aspect | Student Quiz | Teacher Prep |
|--------|--------------|--------------|
| **Audience** | Students learning | Teachers preparing |
| **Question Focus** | Content mastery | Pedagogy + content |
| **Difficulty** | Grade-appropriate | Advanced subject knowledge |
| **Explanations** | Why answer is correct | Teaching strategies + tips |
| **Scenarios** | Problem-solving | Classroom challenges |
| **Purpose** | Assessment | Professional development |

---

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Guide](https://reactnavigation.org/docs/getting-started)
- [AsyncStorage Guide](https://react-native-async-storage.github.io/async-storage/)

---

**Happy Coding! 🚀** Build an amazing teacher preparation experience! -->