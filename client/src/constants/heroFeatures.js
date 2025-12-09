import {
    Users,
    Bot,
    CheckCircle,
    Shield,
    MessageSquare,
    Zap,
} from "lucide-react";

export const topHighlights = [
    {
        title: "Spam-Free",
        subtitle: "Real-time",
        icon: Shield,
        color: "text-primary",
    },
    {
        title: "AI Help",
        subtitle: "Instant",
        icon: Zap,
        color: "text-secondary",
    },
    {
        title: "Institution",
        subtitle: "Private",
        icon: CheckCircle,
        color: "text-accent",
    },
];

export const heroCards = [
    {
        title: "Peer Collaboration",
        desc: "Connect with classmates and help each other learn. Build a supportive academic community.",
        icon: Users,
        bg: "bg-primary/10",
        color: "text-primary",
    },
    {
        title: "AI-Powered",
        desc: "Instant AI fallback with @ai trigger. Get immediate help when peers are unavailable.",
        icon: Bot,
        bg: "bg-secondary/10",
        color: "text-secondary",
    },
    {
        title: "Teacher Verified",
        desc: "Answers verified by teachers for accuracy and credibility you can trust.",
        icon: CheckCircle,
        bg: "bg-accent/10",
        color: "text-accent",
    },
    {
        title: "Spam Control",
        desc: "Advanced flagging, moderation, and ban system keeps discussions relevant and safe.",
        icon: Shield,
        bg: "bg-success/10",
        color: "text-success",
    },
    {
        title: "Real-Time Chat",
        desc: "Socket.IO powered instant messaging for seamless doubt resolution.",
        icon: MessageSquare,
        bg: "bg-warning/10",
        color: "text-warning",
    },
    {
        title: "Institution Private",
        desc: "Your college's own network. Safe, secure, and accessible only to verified students and teachers.",
        icon: Zap,
        bg: "bg-info/10",
        color: "text-info",
    },
];
