import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Plus, Trash2, Clock, FileQuestion } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  type: "multiple-choice" | "essay" | "true-false";
  question: string;
  options?: string[];
  points: number;
}

export const CreateAssessmentPage = () => {
  const { toast } = useToast();
  const [assessment, setAssessment] = useState({
    title: "",
    description: "",
    course: "",
    type: "",
    timeLimit: "",
    passingScore: "",
    allowRetakes: false,
    shuffleQuestions: false,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      points: 10,
    },
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      points: 10,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Assessment Created",
      description: "Your assessment has been created successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-lg">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Create Assessment</h1>
          <p className="text-muted-foreground">
            Design a new assessment for your course
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assessment Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Details</CardTitle>
                <CardDescription>
                  Basic information about the assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Assessment Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter assessment title"
                    value={assessment.title}
                    onChange={(e) => setAssessment({ ...assessment, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the assessment objectives"
                    rows={3}
                    value={assessment.description}
                    onChange={(e) => setAssessment({ ...assessment, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Course</Label>
                    <Select
                      value={assessment.course}
                      onValueChange={(value) => setAssessment({ ...assessment, course: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react-fundamentals">React Fundamentals</SelectItem>
                        <SelectItem value="data-science">Data Science Essentials</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="project-management">Project Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Assessment Type</Label>
                    <Select
                      value={assessment.type}
                      onValueChange={(value) => setAssessment({ ...assessment, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileQuestion className="h-5 w-5" />
                    Questions
                  </CardTitle>
                  <CardDescription>
                    Add and configure assessment questions
                  </CardDescription>
                </div>
                <Button onClick={addQuestion} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={question.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Points:</Label>
                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) })}
                          className="w-20"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label>Question Type</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value: any) => updateQuestion(question.id, { type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="essay">Essay</SelectItem>
                            <SelectItem value="true-false">True/False</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Question</Label>
                        <Textarea
                          placeholder="Enter your question"
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                        />
                      </div>

                      {question.type === "multiple-choice" && (
                        <div>
                          <Label>Answer Options</Label>
                          <div className="space-y-2">
                            {question.options?.map((option, optionIndex) => (
                              <Input
                                key={optionIndex}
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(question.options || [])];
                                  newOptions[optionIndex] = e.target.value;
                                  updateQuestion(question.id, { options: newOptions });
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    placeholder="e.g., 60"
                    value={assessment.timeLimit}
                    onChange={(e) => setAssessment({ ...assessment, timeLimit: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="passingScore">Passing Score (%)</Label>
                  <Input
                    id="passingScore"
                    type="number"
                    placeholder="e.g., 70"
                    value={assessment.passingScore}
                    onChange={(e) => setAssessment({ ...assessment, passingScore: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowRetakes">Allow Retakes</Label>
                  <Switch
                    id="allowRetakes"
                    checked={assessment.allowRetakes}
                    onCheckedChange={(checked) => setAssessment({ ...assessment, allowRetakes: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="shuffleQuestions">Shuffle Questions</Label>
                  <Switch
                    id="shuffleQuestions"
                    checked={assessment.shuffleQuestions}
                    onCheckedChange={(checked) => setAssessment({ ...assessment, shuffleQuestions: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Questions:</span>
                  <span>{questions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Points:</span>
                  <span>{questions.reduce((sum, q) => sum + q.points, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Time:</span>
                  <span>{assessment.timeLimit || 'Not set'} min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Save as Draft</Button>
          <Button type="submit">Create Assessment</Button>
        </div>
      </form>
    </div>
  );
};