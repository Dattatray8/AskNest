import {
  MessageSquare,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Shield,
  Users,
  FileText,
  Flag,
  UserX,
  MessagesSquare,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";

const iconMap = {
  questions: <HelpCircle size={22} />,
  answers: <MessageSquare size={22} />,
  accepted: <CheckCircle size={22} />,
  verified: <ShieldAlert size={22} />,
  unansweredQuestions: <AlertCircle size={22} />,
  spamUsers: <UserX size={22} />,
  reportedQuestions: <Flag size={22} />,
  reportedAnswers: <Flag size={22} />,
  reportedMessages: <MessagesSquare size={22} />,
  teacherApplications: <ClipboardList size={22} />,
  allUsers: <Users size={22} />,
  allQuestions: <FileText size={22} />,
  bannedUsers: <Shield size={22} />,
};

export default function getTabIcon(tabKey) {
  return iconMap[tabKey] || <FileText size={22} />;
}
