'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Save,
  Send,
  FileText,
  BookOpen,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from 'lucide-react';

// Mock assessment data
const mockAssessmentData = {
  1: {
    id: 1,
    title: 'Practical Life Skills Observation',
    type: 'observation',
    course: 'Life Skills 101',
    dueDate: '2023-05-15',
    status: 'pending',
    description:
      'Demonstrate your practical life skills through a series of everyday tasks.',
    instructions:
      'This assessment is designed to observe your practical life skills. You will document your approach to everyday tasks and reflect on your process. Take your time and focus on the quality of your work rather than speed.',
    sections: [
      {
        title: 'Task Documentation',
        description:
          'Document how you approach and complete the following tasks:',
        questions: [
          {
            id: 'q1',
            type: 'text',
            question:
              'Describe how you organize your study space. What systems do you use to keep things in order?',
            placeholder: 'Explain your organization system...',
          },
          {
            id: 'q2',
            type: 'text',
            question:
              'How do you plan and prepare a simple meal? Describe your process step by step.',
            placeholder: 'Detail your meal preparation process...',
          },
          {
            id: 'q3',
            type: 'text',
            question:
              'Explain how you manage your time for completing homework and other responsibilities.',
            placeholder: 'Describe your time management approach...',
          },
        ],
      },
      {
        title: 'Self-Reflection',
        description: 'Reflect on your approach to practical tasks:',
        questions: [
          {
            id: 'q4',
            type: 'text',
            question:
              'What practical life skills do you feel most confident in? Why?',
            placeholder: 'Reflect on your strengths...',
          },
          {
            id: 'q5',
            type: 'text',
            question:
              'What practical life skills would you like to improve? How might you work on these?',
            placeholder: 'Consider areas for growth...',
          },
          {
            id: 'q6',
            type: 'radio',
            question:
              'How would you rate your overall independence in practical life tasks?',
            options: [
              {
                value: 'beginner',
                label: 'Beginner - I need guidance for most tasks',
              },
              {
                value: 'developing',
                label: 'Developing - I can complete some tasks independently',
              },
              {
                value: 'proficient',
                label: 'Proficient - I can complete most tasks independently',
              },
              {
                value: 'advanced',
                label:
                  'Advanced - I can complete tasks independently and help others',
              },
            ],
          },
        ],
      },
      {
        title: 'Goal Setting',
        description: 'Set goals for your practical life skills development:',
        questions: [
          {
            id: 'q7',
            type: 'text',
            question:
              'What is one practical life skill you want to develop in the next month? What steps will you take?',
            placeholder: 'Describe your goal and plan...',
          },
          {
            id: 'q8',
            type: 'checkbox',
            question:
              'Which areas would you like to focus on improving? (Select all that apply)',
            options: [
              { id: 'organization', label: 'Organization' },
              { id: 'time-management', label: 'Time Management' },
              { id: 'meal-preparation', label: 'Meal Preparation' },
              { id: 'cleaning', label: 'Cleaning' },
              { id: 'personal-care', label: 'Personal Care' },
              { id: 'financial-management', label: 'Financial Management' },
            ],
          },
        ],
      },
    ],
    feedback: null,
    score: null,
  },
  2: {
    id: 2,
    title: 'Reading Comprehension Portfolio',
    type: 'portfolio',
    course: 'Language Arts',
    dueDate: '2023-05-20',
    status: 'in-progress',
    description:
      'Create a portfolio showcasing your reading comprehension skills with examples.',
    instructions:
      "This portfolio assessment allows you to demonstrate your reading comprehension skills through various activities. You'll analyze texts, make connections, and reflect on your understanding.",
    progress: 40,
    sections: [
      {
        title: 'Text Analysis',
        description: 'Analyze the provided text passages:',
        questions: [
          {
            id: 'q1',
            type: 'text',
            question:
              "Read the short story 'The Gift of the Magi' and identify the main theme. Support your answer with evidence from the text.",
            placeholder: 'Analyze the theme...',
          },
          {
            id: 'q2',
            type: 'text',
            question:
              "Compare and contrast the characters of Jim and Della in 'The Gift of the Magi'. What motivates each character?",
            placeholder: 'Compare the characters...',
          },
        ],
      },
      {
        title: 'Personal Connections',
        description: 'Make personal connections to the text:',
        questions: [
          {
            id: 'q3',
            type: 'text',
            question:
              'Describe a time when you made a sacrifice for someone you care about. How does your experience compare to the characters in the story?',
            placeholder: 'Share your personal connection...',
            value:
              'Last year, I saved up for months to buy my brother a special birthday gift. I had to give up buying new shoes I wanted, but seeing his happiness was worth it. Like Della in the story, I valued the joy of giving over my personal desires.',
          },
        ],
      },
      {
        title: 'Reflection',
        description: 'Reflect on your reading process:',
        questions: [
          {
            id: 'q4',
            type: 'text',
            question:
              'What strategies do you use to understand challenging texts? Which strategy is most effective for you and why?',
            placeholder: 'Describe your reading strategies...',
          },
          {
            id: 'q5',
            type: 'radio',
            question:
              'How confident do you feel in your ability to analyze literature?',
            options: [
              { value: 'not-confident', label: 'Not confident' },
              { value: 'somewhat-confident', label: 'Somewhat confident' },
              { value: 'confident', label: 'Confident' },
              { value: 'very-confident', label: 'Very confident' },
            ],
            value: 'confident',
          },
        ],
      },
    ],
    feedback: null,
    score: null,
  },
  3: {
    id: 3,
    title: 'Mathematics Practical Task',
    type: 'practical',
    course: 'Mathematics',
    dueDate: '2023-05-10',
    status: 'completed',
    description:
      'Apply mathematical concepts to solve practical, real-world problems.',
    instructions:
      "This assessment evaluates your ability to apply mathematical concepts to real-world situations. You'll solve problems, explain your reasoning, and reflect on the process.",
    sections: [
      {
        title: 'Problem Solving',
        description: 'Solve the following practical math problems:',
        questions: [
          {
            id: 'q1',
            type: 'text',
            question:
              'You are planning a garden in a rectangular space that is 8 feet by 12 feet. If each plant needs 2 square feet of space, how many plants can you fit in the garden? Show your work.',
            value:
              'The area of the garden is 8 feet × 12 feet = 96 square feet. If each plant needs 2 square feet, then I can fit 96 ÷ 2 = 48 plants in the garden.',
          },
          {
            id: 'q2',
            type: 'text',
            question:
              'You are baking cookies for a class party. The recipe makes 24 cookies and calls for 1.5 cups of flour. If you need to make 60 cookies, how much flour will you need? Show your work.',
            value:
              "I need to make 60 cookies, which is 60 ÷ 24 = 2.5 times the original recipe. So I'll need 1.5 cups × 2.5 = 3.75 cups of flour.",
          },
        ],
      },
      {
        title: 'Application',
        description: 'Apply mathematical concepts to real-life scenarios:',
        questions: [
          {
            id: 'q3',
            type: 'text',
            question:
              'Describe a situation in your daily life where you use proportional reasoning. Explain how you use math in this situation.',
            value:
              'I use proportional reasoning when adjusting recipes. Last week, I needed to make half a recipe of pancakes. The original called for 2 cups of mix and 1.5 cups of milk. I calculated that half would require 1 cup of mix and 3/4 cup of milk, maintaining the same ratio.',
          },
        ],
      },
      {
        title: 'Reflection',
        description: 'Reflect on your mathematical thinking:',
        questions: [
          {
            id: 'q4',
            type: 'text',
            question:
              'What was the most challenging part of this assessment? How did you overcome this challenge?',
            value:
              'The most challenging part was visualizing the garden problem. I overcame this by drawing a diagram and dividing it into 2-square-foot sections, which helped me see the solution more clearly.',
          },
          {
            id: 'q5',
            type: 'radio',
            question:
              'How confident do you feel applying math to real-world situations?',
            options: [
              { value: 'not-confident', label: 'Not confident' },
              { value: 'somewhat-confident', label: 'Somewhat confident' },
              { value: 'confident', label: 'Confident' },
              { value: 'very-confident', label: 'Very confident' },
            ],
            value: 'confident',
          },
        ],
      },
    ],
    feedback:
      'Excellent work on applying mathematical concepts to practical situations! Your problem-solving approach is methodical and your explanations are clear. I particularly appreciated your reflection on how you overcame challenges by using visual aids. Continue to practice applying math to different real-world contexts to further strengthen these skills.',
    score: 'Excellent',
  },
};

const AssessmentView = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isReview = location.pathname.includes('/review');
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch assessment data
    const fetchedAssessment = mockAssessmentData[assessmentId];
    if (fetchedAssessment) {
      setAssessment(fetchedAssessment);

      // Initialize answers from assessment if in progress or completed
      if (
        fetchedAssessment.status === 'in-progress' ||
        fetchedAssessment.status === 'completed'
      ) {
        const initialAnswers = {};
        fetchedAssessment.sections.forEach((section) => {
          section.questions.forEach((question) => {
            if (question.value) {
              initialAnswers[question.id] = question.value;
            }
          });
        });
        setAnswers(initialAnswers);
      }
    }
  }, [assessmentId]);

  if (!assessment) {
    return (
      <div className='container mx-auto py-6 flex items-center justify-center h-[80vh]'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>Loading Assessment...</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId, optionId, checked) => {
    const currentValues = answers[questionId] || [];
    let newValues;

    if (checked) {
      newValues = [...currentValues, optionId];
    } else {
      newValues = currentValues.filter((id) => id !== optionId);
    }

    setAnswers((prev) => ({
      ...prev,
      [questionId]: newValues,
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Progress saved successfully!');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      // In a real app, this would submit to the backend
      alert('Assessment submitted successfully!');
      navigate('/assessments');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleNext = () => {
    if (currentSection < assessment.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const currentSectionData = assessment.sections[currentSection];
  const isLastSection = currentSection === assessment.sections.length - 1;
  const isFirstSection = currentSection === 0;

  // Calculate progress percentage
  const progressPercentage =
    ((currentSection + 1) / assessment.sections.length) * 100;

  return (
    <div className='container mx-auto py-6'>
      <Button
        variant='ghost'
        className='mb-4'
        onClick={() => navigate('/assessments')}
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Assessments
      </Button>

      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle>{assessment.title}</CardTitle>
                  <CardDescription>{assessment.course}</CardDescription>
                </div>
                {assessment.status === 'completed' ? (
                  <Badge className='bg-green-500'>{assessment.score}</Badge>
                ) : (
                  <Badge variant='outline' className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    Due: {new Date(assessment.dueDate).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!isReview && (
                <>
                  <div className='mb-4'>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className='h-2' />
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-1'>
                      Section {currentSection + 1}: {currentSectionData.title}
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      {currentSectionData.description}
                    </p>
                  </div>
                </>
              )}

              {isReview && assessment.status === 'completed' && (
                <div className='mb-6 bg-muted p-4 rounded-lg'>
                  <h3 className='text-lg font-semibold mb-2 flex items-center'>
                    <MessageSquare className='mr-2 h-5 w-5' />
                    Teacher Feedback
                  </h3>
                  <p>{assessment.feedback}</p>
                </div>
              )}

              {isReview || assessment.status === 'completed' ? (
                // Review mode - show all sections
                assessment.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className='mb-8'>
                    <h3 className='text-lg font-semibold mb-1'>
                      Section {sectionIndex + 1}: {section.title}
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      {section.description}
                    </p>

                    <div className='space-y-6'>
                      {section.questions.map((question) => (
                        <div
                          key={question.id}
                          className='border p-4 rounded-lg'
                        >
                          <Label className='text-base font-medium mb-2 block'>
                            {question.question}
                          </Label>

                          {question.type === 'text' && (
                            <div>
                              <div className='bg-muted p-3 rounded-md whitespace-pre-wrap'>
                                {answers[question.id] || 'No answer provided'}
                              </div>
                            </div>
                          )}

                          {question.type === 'radio' && (
                            <div className='bg-muted p-3 rounded-md'>
                              {question.options.find(
                                (opt) => opt.value === answers[question.id]
                              )?.label || 'No answer selected'}
                            </div>
                          )}

                          {question.type === 'checkbox' && (
                            <div className='bg-muted p-3 rounded-md'>
                              {answers[question.id] &&
                              answers[question.id].length > 0
                                ? question.options
                                    .filter((opt) =>
                                      answers[question.id].includes(opt.id)
                                    )
                                    .map((opt) => opt.label)
                                    .join(', ')
                                : 'No options selected'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {sectionIndex < assessment.sections.length - 1 && (
                      <Separator className='my-6' />
                    )}
                  </div>
                ))
              ) : (
                // Edit mode - show current section only
                <div className='space-y-6'>
                  {currentSectionData.questions.map((question) => (
                    <div key={question.id} className='border p-4 rounded-lg'>
                      <Label className='text-base font-medium mb-2 block'>
                        {question.question}
                      </Label>

                      {question.type === 'text' && (
                        <Textarea
                          placeholder={question.placeholder}
                          value={answers[question.id] || ''}
                          onChange={(e) =>
                            handleInputChange(question.id, e.target.value)
                          }
                          rows={5}
                          disabled={isReview}
                        />
                      )}

                      {question.type === 'radio' && (
                        <RadioGroup
                          value={answers[question.id] || ''}
                          onValueChange={(value) =>
                            handleInputChange(question.id, value)
                          }
                          disabled={isReview}
                        >
                          <div className='space-y-2'>
                            {question.options.map((option) => (
                              <div
                                key={option.value}
                                className='flex items-center space-x-2'
                              >
                                <RadioGroupItem
                                  value={option.value}
                                  id={`${question.id}-${option.value}`}
                                />
                                <Label
                                  htmlFor={`${question.id}-${option.value}`}
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      )}

                      {question.type === 'checkbox' && (
                        <div className='space-y-2'>
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className='flex items-center space-x-2'
                            >
                              <Checkbox
                                id={`${question.id}-${option.id}`}
                                checked={(answers[question.id] || []).includes(
                                  option.id
                                )}
                                onCheckedChange={(checked) =>
                                  handleCheckboxChange(
                                    question.id,
                                    option.id,
                                    checked
                                  )
                                }
                                disabled={isReview}
                              />
                              <Label htmlFor={`${question.id}-${option.id}`}>
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className='flex justify-between'>
              {!isReview && assessment.status !== 'completed' && (
                <>
                  <div>
                    {!isFirstSection && (
                      <Button variant='outline' onClick={handlePrevious}>
                        Previous Section
                      </Button>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' onClick={handleSave}>
                      <Save className='mr-2 h-4 w-4' />
                      Save Progress
                    </Button>
                    {isLastSection ? (
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className='animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full'></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className='mr-2 h-4 w-4' />
                            Submit Assessment
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>Next Section</Button>
                    )}
                  </div>
                </>
              )}
              {(isReview || assessment.status === 'completed') && (
                <Button
                  variant='outline'
                  onClick={() => navigate('/assessments')}
                >
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Back to Assessments
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Assessment Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='font-medium flex items-center'>
                  <FileText className='mr-2 h-4 w-4' />
                  Type
                </h3>
                <p className='text-muted-foreground'>
                  {assessment.type.charAt(0).toUpperCase() +
                    assessment.type.slice(1)}
                </p>
              </div>

              <div>
                <h3 className='font-medium flex items-center'>
                  <BookOpen className='mr-2 h-4 w-4' />
                  Course
                </h3>
                <p className='text-muted-foreground'>{assessment.course}</p>
              </div>

              <div>
                <h3 className='font-medium flex items-center'>
                  <Clock className='mr-2 h-4 w-4' />
                  Due Date
                </h3>
                <p className='text-muted-foreground'>
                  {new Date(assessment.dueDate).toLocaleDateString()}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className='font-medium flex items-center'>
                  <Lightbulb className='mr-2 h-4 w-4' />
                  Instructions
                </h3>
                <p className='text-muted-foreground text-sm mt-1'>
                  {assessment.instructions}
                </p>
              </div>

              {!isReview && assessment.status !== 'completed' && (
                <>
                  <Separator />

                  <div>
                    <h3 className='font-medium mb-2'>Assessment Progress</h3>
                    <ul className='space-y-2'>
                      {assessment.sections.map((section, index) => (
                        <li key={index} className='flex items-center'>
                          {index < currentSection ? (
                            <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                          ) : index === currentSection ? (
                            <div className='mr-2 h-4 w-4 rounded-full bg-primary'></div>
                          ) : (
                            <div className='mr-2 h-4 w-4 rounded-full bg-muted'></div>
                          )}
                          <span
                            className={
                              index === currentSection
                                ? 'font-medium'
                                : 'text-muted-foreground'
                            }
                          >
                            Section {index + 1}: {section.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {assessment.status === 'completed' && (
                <>
                  <Separator />

                  <div>
                    <h3 className='font-medium flex items-center'>
                      <ThumbsUp className='mr-2 h-4 w-4' />
                      Strengths
                    </h3>
                    <ul className='text-muted-foreground text-sm mt-1 list-disc pl-5 space-y-1'>
                      <li>Clear problem-solving approach</li>
                      <li>Thoughtful self-reflection</li>
                      <li>Practical application of concepts</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className='font-medium flex items-center'>
                      <ThumbsDown className='mr-2 h-4 w-4' />
                      Areas for Growth
                    </h3>
                    <ul className='text-muted-foreground text-sm mt-1 list-disc pl-5 space-y-1'>
                      <li>Expand on explanations</li>
                      <li>Consider multiple approaches</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentView;
