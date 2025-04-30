'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { CheckCircle, Clock, Save } from 'lucide-react';

const Worksheet = ({
  title,
  description,
  questions = [],
  timeLimit = null,
  onSubmit,
  readOnly = false,
  savedAnswers = {},
}) => {
  const [answers, setAnswers] = useState(savedAnswers || {});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    if (readOnly) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleMultipleChoiceChange = (questionId, value, isChecked) => {
    if (readOnly) return;

    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];

      if (isChecked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, value],
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (onSubmit) {
      onSubmit(answers);
    }
  };

  const handleSave = () => {
    if (onSubmit) {
      onSubmit(answers, false); // false indicates this is a save, not a final submission
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            disabled={readOnly}
          >
            {question.options.map((option, index) => (
              <div key={index} className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={option}
                  id={`${question.id}-option-${index}`}
                />
                <Label htmlFor={`${question.id}-option-${index}`}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className='space-y-2'>
            {question.options.map((option, index) => (
              <div key={index} className='flex items-center space-x-2'>
                <Checkbox
                  id={`${question.id}-option-${index}`}
                  checked={(answers[question.id] || []).includes(option)}
                  onCheckedChange={(checked) =>
                    handleMultipleChoiceChange(question.id, option, checked)
                  }
                  disabled={readOnly}
                />
                <Label htmlFor={`${question.id}-option-${index}`}>
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'short-answer':
        return (
          <Input
            placeholder='Type your answer here'
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            disabled={readOnly}
          />
        );

      case 'long-answer':
        return (
          <Textarea
            placeholder='Type your answer here'
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            rows={4}
            disabled={readOnly}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {timeLimit && (
            <div className='flex items-center gap-1 text-sm font-medium'>
              <Clock className='h-4 w-4' />
              <span>{timeRemaining} minutes</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {questions.map((question, index) => (
          <div key={question.id} className='space-y-3'>
            <div className='flex items-start gap-2'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                {index + 1}
              </span>
              <div className='space-y-1'>
                <h3 className='font-medium'>{question.text}</h3>
                {question.hint && (
                  <p className='text-sm text-muted-foreground'>
                    {question.hint}
                  </p>
                )}
              </div>
            </div>
            <div className='ml-8'>{renderQuestion(question)}</div>
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex justify-between'>
        {!readOnly && (
          <>
            <Button variant='outline' onClick={handleSave}>
              <Save className='mr-2 h-4 w-4' />
              Save Progress
            </Button>
            <Button onClick={handleSubmit} disabled={submitted}>
              <CheckCircle className='mr-2 h-4 w-4' />
              {submitted ? 'Submitted' : 'Submit Answers'}
            </Button>
          </>
        )}
        {readOnly && (
          <div className='text-sm text-muted-foreground'>
            This worksheet is in read-only mode
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Worksheet;
