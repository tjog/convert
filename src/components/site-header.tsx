import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRightLeft, Github } from "lucide-react"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4">
                    <a href="/" className="mr-6 flex items-center space-x-2">
                        <ArrowRightLeft className="h-6 w-6" />
                        <span className="font-bold">
                            {siteConfig.name}
                        </span>
                    </a>
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <nav className="flex items-center">
                        <a
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={cn(
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                    "w-9 px-0"
                                )}
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </a>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header >
    )
}