import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { articleTopics, articleFormats, ArticleApplication } from '@/data/articleTopics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send, Plus, X, Save, FileText } from 'lucide-react';

export default function ArticleSubmissionPage() {
  const [formData, setFormData] = useState<Partial<ArticleApplication>>({
    email: '',
    topic: '',
    subtopic: '',
    proposedTitle: '',
    detailedDescription: '',
    format: 'guide',
    sourceData: '',
    thesisList: [''],
    references: '',
    status: 'draft'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save draft
  useEffect(() => {
    const savedDraft = localStorage.getItem('articleDraft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('articleDraft', JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const subtopics = formData.topic 
    ? articleTopics[formData.topic as keyof typeof articleTopics]?.subtopics || []
    : [];

  const addThesis = () => {
    setFormData({
      ...formData,
      thesisList: [...(formData.thesisList || []), '']
    });
  };

  const removeThesis = (index: number) => {
    const newList = [...(formData.thesisList || [])];
    newList.splice(index, 1);
    setFormData({ ...formData, thesisList: newList });
  };

  const updateThesis = (index: number, value: string) => {
    const newList = [...(formData.thesisList || [])];
    newList[index] = value;
    setFormData({ ...formData, thesisList: newList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.topic || !formData.proposedTitle || !formData.detailedDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const applicationId = `APP-${Date.now().toString(36).toUpperCase()}`;
    
    toast.success(`Proposal submitted! ID: ${applicationId}`);
    localStorage.removeItem('articleDraft');
    
    setFormData({
      email: '',
      topic: '',
      subtopic: '',
      proposedTitle: '',
      detailedDescription: '',
      format: 'guide',
      sourceData: '',
      thesisList: [''],
      references: '',
      status: 'draft'
    });
    
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <section className="container-narrow section-spacing-sm">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4">Become an Author</span>
            <h1 className="heading-xl mb-6">Submit Article Proposal</h1>
            <p className="body-xl max-w-2xl mx-auto">
              Propose a topic for publication on our forum. We value quality 
              analytical content, especially comparisons of real returns of various instruments.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-6 space-y-6">
              <h2 className="heading-sm">Contact Information</h2>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="glass-card p-6 space-y-6">
              <h2 className="heading-sm">Article Topic</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select 
                    value={formData.topic} 
                    onValueChange={(value) => setFormData({ ...formData, topic: value, subtopic: '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(articleTopics).map(([key, { name }]) => (
                        <SelectItem key={key} value={key}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Subtopic</Label>
                  <Select 
                    value={formData.subtopic} 
                    onValueChange={(value) => setFormData({ ...formData, subtopic: value })}
                    disabled={!formData.topic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subtopic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subtopics.map((subtopic) => (
                        <SelectItem key={subtopic} value={subtopic}>{subtopic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="title">Article Title *</Label>
                <Input
                  id="title"
                  value={formData.proposedTitle}
                  onChange={(e) => setFormData({ ...formData, proposedTitle: e.target.value })}
                  placeholder="Example: Comparison of Real Returns of Deposits and ETFs Over 10 Years"
                  required
                />
              </div>

              <div>
                <Label>Format</Label>
                <Select 
                  value={formData.format} 
                  onValueChange={(value: any) => setFormData({ ...formData, format: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {articleFormats.map((format) => (
                      <SelectItem key={format.id} value={format.id}>
                        {format.name} — {format.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="glass-card p-6 space-y-6">
              <h2 className="heading-sm">Content</h2>
              
              <div>
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                  placeholder="Describe the essence of the issue you want to address..."
                  rows={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="sourceData">Source Data and Parameters</Label>
                <Textarea
                  id="sourceData"
                  value={formData.sourceData}
                  onChange={(e) => setFormData({ ...formData, sourceData: e.target.value })}
                  placeholder="Specify the data you will use..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Article Theses</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  List the main theses you plan to address
                </p>
                <div className="space-y-2">
                  {formData.thesisList?.map((thesis, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={thesis}
                        onChange={(e) => updateThesis(index, e.target.value)}
                        placeholder={`Thesis ${index + 1}`}
                      />
                      {(formData.thesisList?.length || 0) > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeThesis(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addThesis}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Thesis
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="references">Sources and Links (optional)</Label>
                <Textarea
                  id="references"
                  value={formData.references}
                  onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                  placeholder="Specify data sources, links to research..."
                  rows={2}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Save className="h-3 w-3" />
                Draft saves automatically
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Proposal
                  </>
                )}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}
