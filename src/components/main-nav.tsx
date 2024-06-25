import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { docsConfig } from "@/config/docs"
import { Link, NavLink } from "react-router-dom"

export function MainNav() {
    return (
        <div className="mr-4 hidden sm:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                    {siteConfig.name}
                </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
                {docsConfig.mainNav?.map(
                    (item) =>
                        item.href && (
                            <NavLink
                                to={item.href}
                                className={({ isActive, isPending }) =>
                                    cn("transition-colors hover:text-foreground/80",
                                        isPending ? "text-foreground" : isActive ? "text-foreground" : "text-foreground/60")
                                  }
                            >
                                {item.title}
                            </NavLink>
                        )
                )}
            </nav>
        </div>
    )
}