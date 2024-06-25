import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { Icons } from "./icons"
import { MainNav } from "./main-nav"
import { useFfmpeg } from "@/components/ffmpeg-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useIsTouchDevice } from "@/hooks/is-touch"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export function SiteHeader() {

    const { loaded } = useFfmpeg()

    const isTouchDevice = useIsTouchDevice()

    const trigger = <div>
        <span className={cn("h-2 w-2 rounded-full inline-block", loaded ? "bg-green-500" : "bg-red-500")} />
    </div>

    const content = <span>{loaded ? 'FFMPEG is loaded' : 'FFMPEG is not loaded'}</span>

    return (

        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <MainNav />
                <MobileNav />
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <Popover>
                        <PopoverTrigger>{trigger}</PopoverTrigger>
                        <PopoverContent>{content}</PopoverContent>
                    </Popover>

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
                                <Icons.gitHub className="h-4 w-4" />
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