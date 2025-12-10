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
      toast.error('Заполните все обязательные поля');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const applicationId = `APP-${Date.now().toString(36).toUpperCase()}`;
    
    toast.success(`Заявка отправлена! ID: ${applicationId}`);
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
            <span className="badge-primary mb-4">Стать автором</span>
            <h1 className="heading-xl mb-6">Подать заявку на статью</h1>
            <p className="body-xl max-w-2xl mx-auto">
              Предложите тему для публикации на нашем форуме. Мы ценим качественный 
              аналитический контент, особенно сравнения реальной доходности различных инструментов.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-6 space-y-6">
              <h2 className="heading-sm">Контактная информация</h2>
              
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
              <h2 className="heading-sm">Тема статьи</h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Категория *</Label>
                  <Select 
                    value={formData.topic} 
                    onValueChange={(value) => setFormData({ ...formData, topic: value, subtopic: '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(articleTopics).map(([key, { name }]) => (
                        <SelectItem key={key} value={key}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Подтема</Label>
                  <Select 
                    value={formData.subtopic} 
                    onValueChange={(value) => setFormData({ ...formData, subtopic: value })}
                    disabled={!formData.topic}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите подтему" />
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
                <Label htmlFor="title">Название статьи *</Label>
                <Input
                  id="title"
                  value={formData.proposedTitle}
                  onChange={(e) => setFormData({ ...formData, proposedTitle: e.target.value })}
                  placeholder="Например: Сравнение реальной доходности депозитов и ETF за 10 лет"
                  required
                />
              </div>

              <div>
                <Label>Формат</Label>
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
              <h2 className="heading-sm">Содержание</h2>
              
              <div>
                <Label htmlFor="description">Подробное описание *</Label>
                <Textarea
                  id="description"
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                  placeholder="Опишите суть вопроса, который вы хотите раскрыть..."
                  rows={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="sourceData">Исходные данные и параметры</Label>
                <Textarea
                  id="sourceData"
                  value={formData.sourceData}
                  onChange={(e) => setFormData({ ...formData, sourceData: e.target.value })}
                  placeholder="Укажите данные, которые будете использовать..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Тезисы статьи</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Перечислите основные тезисы, которые планируете раскрыть
                </p>
                <div className="space-y-2">
                  {formData.thesisList?.map((thesis, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={thesis}
                        onChange={(e) => updateThesis(index, e.target.value)}
                        placeholder={`Тезис ${index + 1}`}
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
                    Добавить тезис
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="references">Источники и ссылки (опционально)</Label>
                <Textarea
                  id="references"
                  value={formData.references}
                  onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                  placeholder="Укажите источники данных, ссылки на исследования..."
                  rows={2}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Save className="h-3 w-3" />
                Черновик сохраняется автоматически
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Отправка...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Отправить заявку
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
