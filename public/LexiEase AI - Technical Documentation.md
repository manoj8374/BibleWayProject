# **\`LexiEase AI \- Technical Documentation**

## **1\. Project Overview**

LexiEase AI is an AI-powered dyslexia support system designed to assist individuals with dyslexia by assessing their severity level and providing personalized learning paths. The platform integrates AI-driven document conversion, mind map generation, a chatbot, and gamified exercises, all hosted on Vultr-based cloud services.

---

## **2\. System Architecture**

### **Frontend (User Interface)**

* **Framework**: React (Next.js for optimized performance)  
* **Styling**: Tailwind CSS / Material UI  
* **State Management**: Redux Toolkit / Context API  
* **Authentication**: Firebase Auth (Google, Email Login)  
* **Hosting**: Vercel

### **Backend (AI & API Processing)**

* **Framework**: Flask / FastAPI  
* **Database**: Vultr Managed MySQL (User profiles, test results, progress tracking)  
* **Storage**: Vultr Block Storage (for document uploads and converted files)  
* **AI Processing**:  
  * **NLP Models**: OpenAI API / Hugging Face for text analysis  
  * **Speech-to-Text**: Google STT API / Coqui AI  
  * **Gamification Logic**: Custom-built scoring models  
* **Hosting**: Vultr Compute Instance (Scalable API deployment)

---

## **3\. Key Features & Implementation**

### **1️⃣ Dyslexia Severity Test (AI Assessment)**

#### **🛠 Implementation Steps:**

* User takes a test to evaluate reading ability, word recognition, and letter confusion.  
* AI analyzes errors and response time to determine severity.  
* Results are stored in MySQL for personalized learning paths.

#### **📌 Tech Stack:**

* **Frontend:** React forms to capture user responses.  
* **Backend:** Flask API for processing responses and scoring severity.  
* **ML Model:** Decision Tree / Logistic Regression for classification.  
* **Database:** Stores user test scores for tracking progress.

#### **📄 Sample API Endpoint (Flask)**

@app.route("/evaluate", methods=\["POST"\])  
def evaluate\_test():  
    data \= request.json  
    severity \= analyze\_dyslexia(data)  
    cursor.execute("INSERT INTO user\_results (user\_id, severity) VALUES (%s, %s)", (1, severity))  
    db.commit()  
    return jsonify({"severity": severity})

---

### **2️⃣ AI Document Conversion (Accessibility Tool)**

#### **🛠 Implementation Steps:**

* Users upload a document (PDF/TXT).  
* AI converts text into a dyslexia-friendly format:  
  * **Font adjustments** (OpenDyslexic, increased spacing)  
  * **Background contrast enhancements**  
  * **Text-to-Speech (TTS) support**  
* Processed document is stored in Vultr Block Storage.

#### **📌 Tech Stack:**

* **Frontend:** File upload component in React  
* **Backend:** Flask API for text formatting & speech synthesis  
* **AI Models:** OpenAI Whisper / Google TTS for text-to-speech  
* **Storage:** Vultr Block Storage

#### **📄 Sample File Processing API (Flask)**

@app.route("/convert", methods=\["POST"\])  
def convert\_document():  
    file \= request.files\["file"\]  
    processed\_text \= enhance\_text(file.read())  
    save\_to\_storage(processed\_text)  
    return jsonify({"status": "success", "message": "Document converted"})

---

### **3️⃣ AI Chatbot for Learning Assistance**

#### **🛠 Implementation Steps:**

* Users ask dyslexia-related questions.  
* AI provides:  
  * Text-based explanations in simple language.  
  * Audio pronunciation guidance.  
  * Word meanings with images.  
* User preferences are stored for personalized responses.

#### **📌 Tech Stack:**

* **Frontend:** Chatbot UI in React  
* **Backend:** Flask API handling chatbot logic  
* **AI Models:** GPT-4 / Hugging Face NLP models  
* **Speech Processing:** Google TTS

#### **📄 Sample Chatbot API (Flask)**

@app.route("/chat", methods=\["POST"\])  
def chat():  
    user\_input \= request.json\["message"\]  
    response \= generate\_response(user\_input)  
    return jsonify({"response": response})

---

### **4️⃣ Gamified Learning & Exercises**

#### **🛠 Implementation Steps:**

* AI generates personalized exercises based on test results.  
* Users complete challenges (e.g., word association, phonics training).  
* AI tracks performance and rewards progress.

#### **📌 Tech Stack:**

* **Frontend:** React-based interactive games  
* **Backend:** Flask API for exercise generation & progress tracking  
* **AI Models:** Adaptive learning models (TensorFlow/Keras for gamification)  
* **Database:** Stores user scores and progress

#### **📄 Sample Progress Tracking API (Flask)**

@app.route("/progress", methods=\["POST"\])  
def track\_progress():  
    data \= request.json  
    cursor.execute("UPDATE user\_progress SET score=%s WHERE user\_id=%s", (data\["score"\], data\["user\_id"\]))  
    db.commit()  
    return jsonify({"status": "updated"})

---

## **4\. Deployment & Hosting Strategy**

### **🛠 Deployment Plan**

| Component | Service |
| ----- | ----- |
| **Frontend** | Vercel (React Hosting) |
| **Backend** | Vultr Compute Instance (Flask) |
| **Database** | Vultr Managed MySQL |
| **Storage** | Vultr Block Storage (For Documents) |
| **AI Models** | Hosted via Vultr Compute |

---

## **5\. Security & Scalability Considerations**

### **🔹 Security Measures:**

✅ JWT Authentication for API security ✅ Database encryption for user data ✅ Vultr Block Storage access control ✅ Rate-limiting API endpoints to prevent abuse

### **🔹 Scalability Plan:**

✅ API Load Balancing using Nginx ✅ Auto-scaling Vultr Compute instances ✅ Database optimization using indexing & caching ✅ Efficient storage management for document processing

---

## **6\. Final Hackathon Demo Strategy**

### **📌 Key Steps for Winning Presentation:**

✅ **Start with the Problem** – "1 in 10 people struggle with dyslexia. LexiEase AI empowers them\!" ✅ **Live Demo of Dyslexia Test & AI Features** – Judges can test severity assessment in real-time. ✅ **Showcase AI Document Conversion & Chatbot** – Highlight accessibility impact. ✅ **Demonstrate Gamified Learning Progress** – Visualize improvements. ✅ **Pitch Scalability & Real-World Impact** – Explain future applications for schools & EdTech. ✅ **Powerful Conclusion** – "AI-driven education that makes learning inclusive & accessible\!"

---

## **7\. Future Enhancements**

🔹 Mobile App Version (React Native) 🔹 More advanced ML models for severity assessment 🔹 Expansion to multilingual support 🔹 Integration with AR for immersive learning

---

🚀 **This comprehensive technical documentation ensures that LexiEase AI is structured for maximum impact at the hackathon and beyond\!** 🔥

