import * as React from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ScrollArea } from "./ui/scroll-area"
import { Icons } from "./icons"
import { docsConfig } from "@/config/docs"
import type { UrlObject } from 'url'



export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
                >
                    <svg
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                    >
                        <path
                            d="M3 5H11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 12H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 19H21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <MobileLink
                    href="/"
                    className="flex items-center"
                    onOpenChange={setOpen}
                >
                    <Icons.logo className="mr-2 h-4 w-4" />
                    <span className="font-bold">{siteConfig.name}</span>
                </MobileLink>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                        {docsConfig.mainNav?.map(
                            (item) =>
                                item.href && (
                                    <MobileLink
                                        key={item.href}
                                        href={item.href}
                                        onOpenChange={setOpen}
                                    >
                                        {item.title}
                                    </MobileLink>
                                )
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        {docsConfig.sidebarNav.map((item, index) => (
                            <div key={index} className="flex flex-col space-y-3 pt-6">
                                <h4 className="font-medium">{item.title}</h4>
                                {item?.items?.length &&
                                    item.items.map((item) => (
                                        <React.Fragment key={item.href}>
                                            {!item.disabled &&
                                                (item.href ? (
                                                    <MobileLink
                                                        href={item.href}
                                                        onOpenChange={setOpen}
                                                        className="text-muted-foreground"
                                                    >
                                                        {item.title}
                                                        {item.label && (
                                                            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                                                {item.label}
                                                            </span>
                                                        )}
                                                    </MobileLink>
                                                ) : (
                                                    item.title
                                                ))}
                                        </React.Fragment>
                                    ))}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    // const router = useRouter()
    return (
        //   <Link
        <a
            href={href}
            onClick={() => {
                //   router.push(href.toString())
                onOpenChange?.(false)
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </a>
        //   </Link>
    )
}

type Url = string | UrlObject

type LinkProps = {
    /**
     * The path or URL to navigate to. It can also be an object.
     *
     * @example https://nextjs.org/docs/api-reference/next/link#with-url-object
     */
    href: Url
    /**
     * Optional decorator for the path that will be shown in the browser URL bar. Before Next.js 9.5.3 this was used for dynamic routes, check our [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes) to see how it worked. Note: when this path differs from the one provided in `href` the previous `href`/`as` behavior is used as shown in the [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes).
     */
    as?: Url
    /**
     * Replace the current `history` state instead of adding a new url into the stack.
     *
     * @defaultValue `false`
     */
    replace?: boolean
    /**
     * Whether to override the default scroll behavior
     *
     * @example https://nextjs.org/docs/api-reference/next/link#disable-scrolling-to-the-top-of-the-page
     *
     * @defaultValue `true`
     */
    scroll?: boolean
    /**
     * Update the path of the current page without rerunning [`getStaticProps`](/docs/pages/building-your-application/data-fetching/get-static-props), [`getServerSideProps`](/docs/pages/building-your-application/data-fetching/get-server-side-props) or [`getInitialProps`](/docs/pages/api-reference/functions/get-initial-props).
     *
     * @defaultValue `false`
     */
    shallow?: boolean
    /**
     * Forces `Link` to send the `href` property to its child.
     *
     * @defaultValue `false`
     */
    passHref?: boolean
    /**
     * Prefetch the page in the background.
     * Any `<Link />` that is in the viewport (initially or through scroll) will be preloaded.
     * Prefetch can be disabled by passing `prefetch={false}`. When `prefetch` is set to `false`, prefetching will still occur on hover in pages router but not in app router. Pages using [Static Generation](/docs/basic-features/data-fetching/get-static-props.md) will preload `JSON` files with the data for faster page transitions. Prefetching is only enabled in production.
     *
     * @defaultValue `true`
     */
    prefetch?: boolean
    /**
     * The active locale is automatically prepended. `locale` allows for providing a different locale.
     * When `false` `href` has to include the locale as the default behavior is disabled.
     */
    locale?: string | false
    /**
     * Enable legacy link behavior.
     * @defaultValue `false`
     * @see https://github.com/vercel/next.js/commit/489e65ed98544e69b0afd7e0cfc3f9f6c2b803b7
     */
    legacyBehavior?: boolean
    /**
     * Optional event handler for when the mouse pointer is moved onto Link
     */
    onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
    /**
     * Optional event handler for when Link is touched.
     */
    onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>
    /**
     * Optional event handler for when Link is clicked.
     */
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
}