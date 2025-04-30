'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useToast } from '../../context/ToastContext';
import {
  Play,
  Pause,
  RefreshCw,
  Trophy,
  Clock,
  BarChart,
  CheckCircle,
  KeyboardIcon,
  BookOpen,
  Settings,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Typing lessons by difficulty
const typingLessons = {
  beginner: [
    {
      id: 'b1',
      title: 'Home Row Keys',
      text: 'asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;',
      description: 'Practice the home row keys where your fingers should rest.',
    },
    {
      id: 'b2',
      title: 'Simple Words',
      text: 'dad fad sad lad had ask all fall glass flask jak lad salad flask dad fad sad lad had ask all fall glass flask jak lad salad flask',
      description: 'Simple words using primarily the home row keys.',
    },
    {
      id: 'b3',
      title: 'E and I Keys',
      text: 'die fie lie tie side ride hide slide pride aside inside decide die fie lie tie side ride hide slide pride aside inside decide',
      description: 'Adding the E and I keys to expand your reach.',
    },
  ],
  intermediate: [
    {
      id: 'i1',
      title: 'Common Words',
      text: 'the and that have with this from they some what were when there can make like time just know people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us.',
      description: 'Practice the most common words in English.',
    },
    {
      id: 'i2',
      title: 'Capitalization',
      text: 'The quick brown fox jumps over the lazy dog. My name is John and I live in New York City. She works at Microsoft in Seattle, Washington. Tomorrow is Monday, the start of a new week in June.',
      description: 'Practice proper capitalization with sentences.',
    },
    {
      id: 'i3',
      title: 'Punctuation',
      text: "Hello, how are you today? I'm doing well, thank you! Do you have time to meet later? Yes, I'm free at 3:30 p.m. Great! I'll see you then. Don't forget to bring the report; we need to review it.",
      description: 'Practice typing with various punctuation marks.',
    },
  ],
  advanced: [
    {
      id: 'a1',
      title: 'Numbers and Symbols',
      text: 'Please call me at (555) 123-4567. The meeting is at 9:30 AM on 6/15/2025. The password is P@ssw0rd! and the username is user_123. The total cost is $1,299.99 plus 15% tax.',
      description: 'Practice typing numbers and symbols.',
    },
    {
      id: 'a2',
      title: 'Programming Syntax',
      text: "function calculateSum(a, b) { return a + b; } const result = calculateSum(5, 10); console.log(`The sum is ${result}`); if (result > 10) { console.log('Result is greater than 10'); } else { console.log('Result is not greater than 10'); }",
      description: 'Practice typing programming code syntax.',
    },
    {
      id: 'a3',
      title: 'Speed Challenge',
      text: 'The five boxing wizards jump quickly. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Bright vixens jump; dozy fowl quack. Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz.',
      description:
        'Pangrams that use every letter of the alphabet for speed practice.',
    },
  ],
};

// Custom text for practice
const customTexts = [
  {
    id: 'c1',
    title: 'Technology',
    text: 'Computers have revolutionized the way we work, communicate, and access information. From smartphones to laptops, technology continues to evolve at a rapid pace, making our lives more connected and efficient than ever before.',
  },
  {
    id: 'c2',
    title: 'Education',
    text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today. The roots of education are bitter, but the fruit is sweet. Education is not the filling of a pail, but the lighting of a fire.',
  },
  {
    id: 'c3',
    title: 'Nature',
    text: "The Earth's natural beauty, from the stunning landscapes to the diverse wildlife, reminds us of the importance of conservation. Protecting our environment ensures that future generations can enjoy the wonders of nature.",
  },
];

// Keyboard layout
const keyboardLayout = [
  [
    { key: '`', shift: '~', code: 'Backquote' },
    { key: '1', shift: '!', code: 'Digit1' },
    { key: '2', shift: '@', code: 'Digit2' },
    { key: '3', shift: '#', code: 'Digit3' },
    { key: '4', shift: '$', code: 'Digit4' },
    { key: '5', shift: '%', code: 'Digit5' },
    { key: '6', shift: '^', code: 'Digit6' },
    { key: '7', shift: '&', code: 'Digit7' },
    { key: '8', shift: '*', code: 'Digit8' },
    { key: '9', shift: '(', code: 'Digit9' },
    { key: '0', shift: ')', code: 'Digit0' },
    { key: '-', shift: '_', code: 'Minus' },
    { key: '=', shift: '+', code: 'Equal' },
    { key: 'Backspace', code: 'Backspace', width: 2 },
  ],
  [
    { key: 'Tab', code: 'Tab', width: 1.5 },
    { key: 'q', shift: 'Q', code: 'KeyQ' },
    { key: 'w', shift: 'W', code: 'KeyW' },
    { key: 'e', shift: 'E', code: 'KeyE' },
    { key: 'r', shift: 'R', code: 'KeyR' },
    { key: 't', shift: 'T', code: 'KeyT' },
    { key: 'y', shift: 'Y', code: 'KeyY' },
    { key: 'u', shift: 'U', code: 'KeyU' },
    { key: 'i', shift: 'I', code: 'KeyI' },
    { key: 'o', shift: 'O', code: 'KeyO' },
    { key: 'p', shift: 'P', code: 'KeyP' },
    { key: '[', shift: '{', code: 'BracketLeft' },
    { key: ']', shift: '}', code: 'BracketRight' },
    { key: '\\', shift: '|', code: 'Backslash', width: 1.5 },
  ],
  [
    { key: 'CapsLock', code: 'CapsLock', width: 1.75 },
    { key: 'a', shift: 'A', code: 'KeyA' },
    { key: 's', shift: 'S', code: 'KeyS' },
    { key: 'd', shift: 'D', code: 'KeyD' },
    { key: 'f', shift: 'F', code: 'KeyF' },
    { key: 'g', shift: 'G', code: 'KeyG' },
    { key: 'h', shift: 'H', code: 'KeyH' },
    { key: 'j', shift: 'J', code: 'KeyJ' },
    { key: 'k', shift: 'K', code: 'KeyK' },
    { key: 'l', shift: 'L', code: 'KeyL' },
    { key: ';', shift: ':', code: 'Semicolon' },
    { key: "'", shift: '"', code: 'Quote' },
    { key: 'Enter', code: 'Enter', width: 2.25 },
  ],
  [
    { key: 'Shift', code: 'ShiftLeft', width: 2.25 },
    { key: 'z', shift: 'Z', code: 'KeyZ' },
    { key: 'x', shift: 'X', code: 'KeyX' },
    { key: 'c', shift: 'C', code: 'KeyC' },
    { key: 'v', shift: 'V', code: 'KeyV' },
    { key: 'b', shift: 'B', code: 'KeyB' },
    { key: 'n', shift: 'N', code: 'KeyN' },
    { key: 'm', shift: 'M', code: 'KeyM' },
    { key: ',', shift: '<', code: 'Comma' },
    { key: '.', shift: '>', code: 'Period' },
    { key: '/', shift: '?', code: 'Slash' },
    { key: 'Shift', code: 'ShiftRight', width: 2.75 },
  ],
  [
    { key: 'Ctrl', code: 'ControlLeft', width: 1.25 },
    { key: 'Win', code: 'MetaLeft', width: 1.25 },
    { key: 'Alt', code: 'AltLeft', width: 1.25 },
    { key: ' ', code: 'Space', width: 6.25 },
    { key: 'Alt', code: 'AltRight', width: 1.25 },
    { key: 'Win', code: 'MetaRight', width: 1.25 },
    { key: 'Menu', code: 'ContextMenu', width: 1.25 },
    { key: 'Ctrl', code: 'ControlRight', width: 1.25 },
  ],
];

const TypingTutor = () => {
  const [difficulty, setDifficulty] = useState('beginner');
  const [currentLesson, setCurrentLesson] = useState(typingLessons.beginner[0]);
  const [customText, setCustomText] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [text, setText] = useState(currentLesson.text);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [activeKeys, setActiveKeys] = useState([]);
  const [incorrectKeys, setIncorrectKeys] = useState([]);
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    progress: 0,
  });
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    highlightNextKey: true,
    soundFeedback: true,
    showErrors: true,
    fontSize: 18,
  });

  const inputRef = useRef(null);
  const textDisplayRef = useRef(null);
  const { toast } = useToast();
  const correctSound = useRef(null);
  const incorrectSound = useRef(null);
  const completionSound = useRef(null);

  // Initialize sounds
  useEffect(() => {
    correctSound.current = new Audio('/sounds/correct-key.mp3');
    incorrectSound.current = new Audio('/sounds/incorrect-key.mp3');
    completionSound.current = new Audio('/sounds/completion.mp3');

    correctSound.current.volume = 0.3;
    incorrectSound.current.volume = 0.3;
    completionSound.current.volume = 0.5;

    // Check for CapsLock
    window.addEventListener('keydown', handleCapsLock);
    return () => {
      window.removeEventListener('keydown', handleCapsLock);
    };
  }, []);

  // Update text when lesson or difficulty changes
  useEffect(() => {
    if (!isCustom) {
      const lessons = typingLessons[difficulty];
      setCurrentLesson(lessons[0]);
      setText(lessons[0].text);
      resetExercise();
    }
  }, [difficulty, isCustom]);

  // Update lesson when selected
  useEffect(() => {
    if (!isCustom && currentLesson) {
      setText(currentLesson.text);
      resetExercise();
    }
  }, [currentLesson, isCustom]);

  // Calculate stats during typing
  useEffect(() => {
    if (isActive && startTime) {
      const calculateStats = () => {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
        const wordsTyped = userInput.trim().split(/\s+/).length;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

        // Calculate accuracy
        let correctChars = 0;
        for (let i = 0; i < userInput.length; i++) {
          if (i < text.length && userInput[i] === text[i]) {
            correctChars++;
          }
        }
        const accuracy =
          userInput.length > 0
            ? Math.round((correctChars / userInput.length) * 100)
            : 100;
        const errors = userInput.length - correctChars;
        const progress =
          text.length > 0
            ? Math.round((userInput.length / text.length) * 100)
            : 0;

        setStats({
          wpm,
          accuracy,
          errors,
          progress,
        });
      };

      const interval = setInterval(calculateStats, 500);
      return () => clearInterval(interval);
    }
  }, [isActive, startTime, userInput, text]);

  // Check for exercise completion
  useEffect(() => {
    if (isActive && userInput.length === text.length && userInput === text) {
      handleCompletion();
    }
  }, [userInput, text, isActive]);

  // Handle keyboard focus
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Handle CapsLock detection
  const handleCapsLock = (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  // Start the typing exercise
  const startExercise = () => {
    setIsActive(true);
    setStartTime(Date.now());
    setEndTime(null);
    setUserInput('');
    setStats({
      wpm: 0,
      accuracy: 100,
      errors: 0,
      progress: 0,
    });
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Pause the typing exercise
  const pauseExercise = () => {
    setIsActive(false);
  };

  // Reset the typing exercise
  const resetExercise = () => {
    setIsActive(false);
    setStartTime(null);
    setEndTime(null);
    setUserInput('');
    setStats({
      wpm: 0,
      accuracy: 100,
      errors: 0,
      progress: 0,
    });
    setActiveKeys([]);
    setIncorrectKeys([]);
  };

  // Handle exercise completion
  const handleCompletion = () => {
    setIsActive(false);
    setEndTime(Date.now());

    // Play completion sound
    if (settings.soundFeedback) {
      completionSound.current
        .play()
        .catch((e) => console.log('Audio play prevented:', e));
    }

    // Save to history
    const result = {
      date: new Date().toISOString(),
      lesson: isCustom ? 'Custom Text' : currentLesson.title,
      difficulty: isCustom ? 'custom' : difficulty,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      textLength: text.length,
    };

    setHistory((prev) => [result, ...prev]);

    // Show toast notification
    toast.success('Exercise completed!', {
      description: `WPM: ${stats.wpm} | Accuracy: ${stats.accuracy}%`,
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    if (!isActive && e.target.value.length > 0) {
      startExercise();
    }

    const newInput = e.target.value;
    setUserInput(newInput);

    // Highlight next key to press
    if (settings.highlightNextKey && newInput.length < text.length) {
      const nextChar = text[newInput.length];
      const keyInfo = findKeyByChar(nextChar);

      if (keyInfo) {
        setActiveKeys([keyInfo.code]);
      } else {
        setActiveKeys([]);
      }
    } else {
      setActiveKeys([]);
    }
  };

  // Handle key press for sound feedback
  const handleKeyPress = (e) => {
    if (!isActive) return;

    const currentIndex = userInput.length;
    if (currentIndex < text.length) {
      const expectedChar = text[currentIndex];
      const typedChar = e.key;

      if (typedChar === expectedChar) {
        // Correct key
        if (settings.soundFeedback) {
          correctSound.current.currentTime = 0;
          correctSound.current
            .play()
            .catch((e) => console.log('Audio play prevented:', e));
        }
        setIncorrectKeys([]);
      } else {
        // Incorrect key
        if (settings.soundFeedback) {
          incorrectSound.current.currentTime = 0;
          incorrectSound.current
            .play()
            .catch((e) => console.log('Audio play prevented:', e));
        }

        const keyInfo = findKeyByChar(typedChar);
        if (keyInfo) {
          setIncorrectKeys([keyInfo.code]);
          setTimeout(() => setIncorrectKeys([]), 300);
        }
      }
    }
  };

  // Find keyboard key by character
  const findKeyByChar = (char) => {
    for (const row of keyboardLayout) {
      for (const key of row) {
        if (
          key.key.toLowerCase() === char.toLowerCase() ||
          key.shift === char
        ) {
          return key;
        }
      }
    }
    return null;
  };

  // Handle lesson selection
  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setText(lesson.text);
    resetExercise();
  };

  // Handle custom text selection
  const handleCustomTextSelect = (text) => {
    setCustomText(text.text);
    setText(text.text);
    resetExercise();
  };

  // Toggle custom text mode
  const toggleCustomMode = (value) => {
    setIsCustom(value);
    if (value) {
      // Switch to custom text
      if (customTexts.length > 0) {
        setCustomText(customTexts[0].text);
        setText(customTexts[0].text);
      } else {
        setCustomText('');
        setText('');
      }
    } else {
      // Switch back to lessons
      const lessons = typingLessons[difficulty];
      setCurrentLesson(lessons[0]);
      setText(lessons[0].text);
    }
    resetExercise();
  };

  // Update custom text
  const updateCustomText = (e) => {
    setCustomText(e.target.value);
    setText(e.target.value);
    resetExercise();
  };

  // Render the text with highlighting for typed characters
  const renderText = () => {
    const textArray = text.split('');
    return (
      <div
        ref={textDisplayRef}
        className='font-mono text-left whitespace-pre-wrap break-all'
        style={{ fontSize: `${settings.fontSize}px` }}
      >
        {textArray.map((char, index) => {
          let className = '';
          if (index < userInput.length) {
            className =
              userInput[index] === char
                ? 'text-green-500 font-bold'
                : 'text-red-500 font-bold';
          } else if (index === userInput.length && settings.highlightNextKey) {
            className = 'bg-primary/20 text-primary font-bold underline';
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  // Render the virtual keyboard
  const renderKeyboard = () => {
    return (
      <div className='mt-4 select-none'>
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-center mb-1'>
            {row.map((key, keyIndex) => {
              const isActive = activeKeys.includes(key.code);
              const isIncorrect = incorrectKeys.includes(key.code);
              const displayKey =
                key.key === ' '
                  ? 'Space'
                  : key.key.length === 1
                  ? shift || capsLock
                    ? key.shift || key.key.toUpperCase()
                    : key.key
                  : key.key;

              return (
                <div
                  key={keyIndex}
                  className={cn(
                    'border rounded mx-0.5 flex items-center justify-center text-xs sm:text-sm transition-colors',
                    key.width ? `w-[${key.width * 2}rem]` : 'w-8 sm:w-10',
                    'h-8 sm:h-10',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted',
                    isIncorrect ? 'bg-red-500 text-white' : '',
                    key.key === 'Shift' && shift ? 'bg-primary/50' : '',
                    key.key === 'CapsLock' && capsLock ? 'bg-primary/50' : ''
                  )}
                  style={{
                    width: key.width ? `${key.width * 2}rem` : undefined,
                  }}
                >
                  {displayKey}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='typing-tutor'>
      <Tabs defaultValue='practice'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='practice'>
            <KeyboardIcon className='h-4 w-4 mr-2' />
            Practice
          </TabsTrigger>
          <TabsTrigger value='lessons'>
            <BookOpen className='h-4 w-4 mr-2' />
            Lessons
          </TabsTrigger>
          <TabsTrigger value='stats'>
            <BarChart className='h-4 w-4 mr-2' />
            Statistics
          </TabsTrigger>
          <TabsTrigger value='settings'>
            <Settings className='h-4 w-4 mr-2' />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Practice Tab */}
        <TabsContent value='practice' className='space-y-4'>
          <Card>
            <CardHeader>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
                <div>
                  <CardTitle>
                    {isCustom ? 'Custom Text Practice' : currentLesson.title}
                    <Badge variant='outline' className='ml-2'>
                      {isCustom
                        ? 'Custom'
                        : difficulty.charAt(0).toUpperCase() +
                          difficulty.slice(1)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {isCustom
                      ? 'Practice with your own text'
                      : currentLesson.description}
                  </CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                  {!isActive && !endTime && (
                    <Button onClick={startExercise}>
                      <Play className='h-4 w-4 mr-2' />
                      Start
                    </Button>
                  )}
                  {isActive && (
                    <Button onClick={pauseExercise} variant='outline'>
                      <Pause className='h-4 w-4 mr-2' />
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetExercise} variant='outline'>
                    <RefreshCw className='h-4 w-4 mr-2' />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-4 gap-2'>
                  <div className='col-span-1 bg-muted rounded-lg p-3 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-bold'>{stats.wpm}</div>
                    <div className='text-xs text-muted-foreground'>WPM</div>
                  </div>
                  <div className='col-span-1 bg-muted rounded-lg p-3 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-bold'>{stats.accuracy}%</div>
                    <div className='text-xs text-muted-foreground'>
                      Accuracy
                    </div>
                  </div>
                  <div className='col-span-1 bg-muted rounded-lg p-3 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-bold'>{stats.errors}</div>
                    <div className='text-xs text-muted-foreground'>Errors</div>
                  </div>
                  <div className='col-span-1 bg-muted rounded-lg p-3 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-bold'>
                      {startTime && !endTime
                        ? Math.floor((Date.now() - startTime) / 1000)
                        : endTime
                        ? Math.floor((endTime - startTime) / 1000)
                        : 0}
                    </div>
                    <div className='text-xs text-muted-foreground'>Seconds</div>
                  </div>
                </div>

                <div>
                  <div className='flex justify-between text-sm mb-1'>
                    <span>Progress</span>
                    <span>{stats.progress}%</span>
                  </div>
                  <Progress value={stats.progress} className='h-2' />
                </div>

                <div className='border rounded-lg p-4 min-h-[120px] bg-muted/30'>
                  {renderText()}
                </div>

                <div className='relative'>
                  <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    disabled={!isActive}
                    className='w-full h-20 p-3 border rounded-lg resize-none font-mono bg-background'
                    placeholder={
                      isActive
                        ? 'Start typing...'
                        : 'Press Start to begin typing'
                    }
                    aria-label='Typing input'
                  />
                  {capsLock && (
                    <div className='absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded'>
                      CAPS LOCK ON
                    </div>
                  )}
                </div>

                {showKeyboard && renderKeyboard()}
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <KeyboardIcon className='h-4 w-4' />
                <Label htmlFor='show-keyboard'>Show Keyboard</Label>
                <Switch
                  id='show-keyboard'
                  checked={showKeyboard}
                  onCheckedChange={setShowKeyboard}
                />
              </div>
              <div className='text-sm text-muted-foreground'>
                {isCustom ? 'Custom Text' : `Lesson: ${currentLesson.title}`}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Lessons Tab */}
        <TabsContent value='lessons' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Typing Lessons</CardTitle>
              <CardDescription>
                Select a lesson or practice with custom text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Label htmlFor='difficulty'>Difficulty:</Label>
                    <Select
                      value={difficulty}
                      onValueChange={setDifficulty}
                      disabled={isCustom}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Select difficulty' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='beginner'>Beginner</SelectItem>
                        <SelectItem value='intermediate'>
                          Intermediate
                        </SelectItem>
                        <SelectItem value='advanced'>Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Label htmlFor='custom-mode'>Custom Text:</Label>
                    <Switch
                      id='custom-mode'
                      checked={isCustom}
                      onCheckedChange={toggleCustomMode}
                    />
                  </div>
                </div>

                {!isCustom ? (
                  <div className='space-y-2'>
                    <h3 className='font-medium'>Available Lessons:</h3>
                    <div className='grid gap-2'>
                      {typingLessons[difficulty].map((lesson) => (
                        <div
                          key={lesson.id}
                          className={cn(
                            'border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors',
                            currentLesson.id === lesson.id
                              ? 'border-primary bg-primary/5'
                              : ''
                          )}
                          onClick={() => handleLessonSelect(lesson)}
                        >
                          <div className='font-medium'>{lesson.title}</div>
                          <div className='text-sm text-muted-foreground'>
                            {lesson.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='custom-text'>
                        Enter your custom text:
                      </Label>
                      <textarea
                        id='custom-text'
                        value={customText}
                        onChange={updateCustomText}
                        className='w-full h-32 mt-1 p-3 border rounded-lg resize-none font-mono'
                        placeholder='Type or paste your text here...'
                      />
                    </div>
                    <div>
                      <h3 className='font-medium mb-2'>
                        Or select from templates:
                      </h3>
                      <div className='grid gap-2'>
                        {customTexts.map((text) => (
                          <div
                            key={text.id}
                            className='border rounded-lg p-3 cursor-pointer hover:bg-accent transition-colors'
                            onClick={() => handleCustomTextSelect(text)}
                          >
                            <div className='font-medium'>{text.title}</div>
                            <div className='text-sm text-muted-foreground truncate'>
                              {text.text.substring(0, 60)}...
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value='stats' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Your Typing Statistics</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <Card>
                      <CardContent className='pt-6'>
                        <div className='text-center'>
                          <Trophy className='h-8 w-8 text-primary mx-auto mb-2' />
                          <div className='text-2xl font-bold'>
                            {Math.max(...history.map((item) => item.wpm))}
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Best WPM
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className='pt-6'>
                        <div className='text-center'>
                          <CheckCircle className='h-8 w-8 text-green-500 mx-auto mb-2' />
                          <div className='text-2xl font-bold'>
                            {Math.max(...history.map((item) => item.accuracy))}%
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Best Accuracy
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className='pt-6'>
                        <div className='text-center'>
                          <Clock className='h-8 w-8 text-blue-500 mx-auto mb-2' />
                          <div className='text-2xl font-bold'>
                            {history.reduce((sum, item) => sum + 1, 0)}
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Exercises Completed
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className='pt-6'>
                        <div className='text-center'>
                          <Zap className='h-8 w-8 text-amber-500 mx-auto mb-2' />
                          <div className='text-2xl font-bold'>
                            {Math.round(
                              history.reduce((sum, item) => sum + item.wpm, 0) /
                                history.length
                            )}
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Average WPM
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className='font-medium'>Recent History:</h3>
                  <div className='border rounded-lg overflow-hidden'>
                    <div className='grid grid-cols-5 gap-4 p-3 bg-muted font-medium text-sm'>
                      <div>Date</div>
                      <div>Lesson</div>
                      <div className='text-center'>WPM</div>
                      <div className='text-center'>Accuracy</div>
                      <div className='text-center'>Errors</div>
                    </div>
                    <div className='divide-y'>
                      {history.slice(0, 10).map((item, index) => (
                        <div
                          key={index}
                          className='grid grid-cols-5 gap-4 p-3 text-sm'
                        >
                          <div>{new Date(item.date).toLocaleDateString()}</div>
                          <div className='truncate'>{item.lesson}</div>
                          <div className='text-center'>{item.wpm}</div>
                          <div className='text-center'>{item.accuracy}%</div>
                          <div className='text-center'>{item.errors}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-center py-8'>
                  <BarChart className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                  <h3 className='font-medium text-lg mb-2'>
                    No Statistics Yet
                  </h3>
                  <p className='text-muted-foreground'>
                    Complete typing exercises to start tracking your progress.
                  </p>
                  <Button
                    className='mt-4'
                    onClick={() =>
                      document.querySelector('[value="practice"]').click()
                    }
                  >
                    Start Practicing
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value='settings' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Typing Tutor Settings</CardTitle>
              <CardDescription>
                Customize your typing experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='highlight-next-key'>
                      Highlight Next Key
                    </Label>
                    <p className='text-sm text-muted-foreground'>
                      Highlight the next key to press on the virtual keyboard
                    </p>
                  </div>
                  <Switch
                    id='highlight-next-key'
                    checked={settings.highlightNextKey}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        highlightNextKey: checked,
                      }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='sound-feedback'>Sound Feedback</Label>
                    <p className='text-sm text-muted-foreground'>
                      Play sounds for correct/incorrect keystrokes
                    </p>
                  </div>
                  <Switch
                    id='sound-feedback'
                    checked={settings.soundFeedback}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        soundFeedback: checked,
                      }))
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label htmlFor='show-errors'>Show Errors</Label>
                    <p className='text-sm text-muted-foreground'>
                      Highlight typing errors in the text
                    </p>
                  </div>
                  <Switch
                    id='show-errors'
                    checked={settings.showErrors}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({ ...prev, showErrors: checked }))
                    }
                  />
                </div>

                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <Label htmlFor='font-size'>
                      Font Size: {settings.fontSize}px
                    </Label>
                    <span className='text-sm text-muted-foreground'>
                      {settings.fontSize}px
                    </span>
                  </div>
                  <Slider
                    id='font-size'
                    min={12}
                    max={28}
                    step={1}
                    value={[settings.fontSize]}
                    onValueChange={(value) =>
                      setSettings((prev) => ({ ...prev, fontSize: value[0] }))
                    }
                  />
                </div>

                <div className='pt-4'>
                  <Button
                    onClick={() => {
                      setSettings({
                        highlightNextKey: true,
                        soundFeedback: true,
                        showErrors: true,
                        fontSize: 18,
                      });
                      toast.success('Settings reset to defaults');
                    }}
                    variant='outline'
                  >
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TypingTutor;
