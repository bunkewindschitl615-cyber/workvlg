import type { IconName } from '@/components/ui/icons';

export interface ProcessStep {
  title: string;
  text: string;
  icon: IconName;
}

export const processSteps: readonly ProcessStep[] = [
  { title: 'Вы оставляете заявку', text: 'По телефону, в мессенджере или через сайт. Достаточно коротко описать задачу.', icon: 'message' },
  { title: 'Уточняем задачу', text: 'Связываемся с вами, задаём вопросы и при необходимости просим фото.', icon: 'phone' },
  { title: 'Осматриваем объект', text: 'Если для оценки нужно увидеть объект, договариваемся об осмотре.', icon: 'map-pin' },
  { title: 'Определяем объём и стоимость', text: 'Составляем перечень работ и называем стоимость.', icon: 'calculator' },
  { title: 'Согласовываем условия', text: 'Обсуждаем сроки, порядок работ и другие детали до начала.', icon: 'document' },
  { title: 'Выполняем работу', text: 'Привлекаем нужных специалистов, технику и организуем процесс.', icon: 'wrench' },
  { title: 'Передаём результат', text: 'Показываем выполненную работу и передаём объект вам.', icon: 'check' },
];
