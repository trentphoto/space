import Link from "next/link";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Info, Rocket, Settings } from "lucide-react";

export default function Nav() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
                href="/"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <Rocket className="h-4 w-4 transition-all group-hover:scale-110" />
            </Link>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                    href="/about"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                    <Info className="h-5 w-5" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </nav>
        </aside>
    )
}
