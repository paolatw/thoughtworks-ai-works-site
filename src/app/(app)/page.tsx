import { WelcomeLanding } from '@/components/voice/WelcomeLanding';
import { getSection1Questions } from '@/lib/knowledge-base-questions';

export default async function Home() {
  const questions = await getSection1Questions();
  return <WelcomeLanding knowledgeBaseQuestions={questions} />;
}
