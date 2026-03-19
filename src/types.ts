/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Symptom {
  id: string;
  label: string;
  category: 'General' | 'Respiratory' | 'Neurological' | 'Digestive' | 'Skin' | 'Musculoskeletal';
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  requiredSymptoms: string[]; 
  commonSymptoms: string[]; // Symptoms that are often present but not strictly required
  recommendation: string;
  severity: 'Low' | 'Medium' | 'High';
  causes: string[];
  whenToSeeDoctor: string;
}

export const SYMPTOMS: Symptom[] = [
  { id: 'fever', label: 'Fever', category: 'General' },
  { id: 'fatigue', label: 'Fatigue', category: 'General' },
  { id: 'headache', label: 'Headache', category: 'Neurological' },
  { id: 'cough', label: 'Cough', category: 'Respiratory' },
  { id: 'sore_throat', label: 'Sore Throat', category: 'Respiratory' },
  { id: 'runny_nose', label: 'Runny Nose', category: 'Respiratory' },
  { id: 'sneezing', label: 'Sneezing', category: 'Respiratory' },
  { id: 'shortness_of_breath', label: 'Shortness of Breath', category: 'Respiratory' },
  { id: 'nausea', label: 'Nausea', category: 'Digestive' },
  { id: 'vomiting', label: 'Vomiting', category: 'Digestive' },
  { id: 'diarrhea', label: 'Diarrhea', category: 'Digestive' },
  { id: 'muscle_pain', label: 'Muscle Pain', category: 'Musculoskeletal' },
  { id: 'joint_pain', label: 'Joint Pain', category: 'Musculoskeletal' },
  { id: 'rash', label: 'Skin Rash', category: 'Skin' },
  { id: 'itching', label: 'Itching', category: 'Skin' },
  { id: 'chills', label: 'Chills', category: 'General' },
  { id: 'chest_pain', label: 'Chest Pain', category: 'Respiratory' },
  { id: 'dizziness', label: 'Dizziness', category: 'Neurological' },
  { id: 'stiff_neck', label: 'Stiff Neck', category: 'Musculoskeletal' },
];

export const DISEASES: Disease[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    description: 'A viral infection of your upper respiratory tract.',
    requiredSymptoms: ['runny_nose', 'sneezing'],
    commonSymptoms: ['sore_throat', 'cough', 'fatigue'],
    recommendation: 'Rest, stay hydrated, and use over-the-counter cold remedies.',
    severity: 'Low',
    causes: ['Rhinoviruses', 'Coronaviruses', 'Adenoviruses'],
    whenToSeeDoctor: 'If symptoms last more than 10 days or you have a high fever.',
  },
  {
    id: 'influenza',
    name: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses.',
    requiredSymptoms: ['fever', 'cough', 'muscle_pain'],
    commonSymptoms: ['fatigue', 'chills', 'headache', 'sore_throat'],
    recommendation: 'Rest, fluids, and antiviral medication if prescribed by a doctor.',
    severity: 'Medium',
    causes: ['Influenza A viruses', 'Influenza B viruses'],
    whenToSeeDoctor: 'If you have difficulty breathing, chest pain, or persistent dizziness.',
  },
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'A neurological condition that can cause multiple symptoms, most notably intense headaches.',
    requiredSymptoms: ['headache'],
    commonSymptoms: ['nausea', 'dizziness', 'fatigue'],
    recommendation: 'Rest in a dark, quiet room. Consult a doctor for migraine-specific medication.',
    severity: 'Medium',
    causes: ['Genetics', 'Environmental triggers', 'Hormonal changes'],
    whenToSeeDoctor: 'If you experience a "thunderclap" headache or vision changes.',
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis',
    description: 'Inflammation of the stomach and intestines, typically resulting from bacterial toxins or viral infection.',
    requiredSymptoms: ['diarrhea', 'nausea'],
    commonSymptoms: ['vomiting', 'fever', 'muscle_pain'],
    recommendation: 'Stay hydrated with electrolyte solutions. Eat bland foods.',
    severity: 'Medium',
    causes: ['Norovirus', 'Rotavirus', 'Contaminated food or water'],
    whenToSeeDoctor: 'If you cannot keep fluids down for 24 hours or see blood in stool.',
  },
  {
    id: 'bronchitis',
    name: 'Acute Bronchitis',
    description: 'Inflammation of the bronchial tubes, which carry air to and from your lungs.',
    requiredSymptoms: ['cough', 'shortness_of_breath'],
    commonSymptoms: ['fatigue', 'chest_pain', 'fever'],
    recommendation: 'Use a humidifier, rest, and drink plenty of fluids.',
    severity: 'Medium',
    causes: ['Viral infections', 'Air pollution', 'Smoking'],
    whenToSeeDoctor: 'If cough lasts more than 3 weeks or you cough up blood.',
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    description: 'An infection that inflames the air sacs in one or both lungs.',
    requiredSymptoms: ['fever', 'cough', 'shortness_of_breath', 'chest_pain'],
    commonSymptoms: ['chills', 'fatigue', 'nausea'],
    recommendation: 'Seek immediate medical attention. This often requires antibiotics.',
    severity: 'High',
    causes: ['Bacteria (Streptococcus pneumoniae)', 'Viruses', 'Fungi'],
    whenToSeeDoctor: 'Seek emergency care immediately for difficulty breathing or bluish lips.',
  },
  {
    id: 'meningitis',
    name: 'Meningitis',
    description: 'Inflammation of the brain and spinal cord membranes, typically caused by an infection.',
    requiredSymptoms: ['fever', 'headache', 'stiff_neck'],
    commonSymptoms: ['nausea', 'vomiting', 'dizziness'],
    recommendation: 'EMERGENCY: Seek immediate hospital care.',
    severity: 'High',
    causes: ['Bacterial infection', 'Viral infection', 'Fungal infection'],
    whenToSeeDoctor: 'Seek emergency care immediately. This is a life-threatening condition.',
  },
];
