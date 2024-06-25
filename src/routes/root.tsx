import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router";

function Root() {
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">
                <div className="container relative">
                    <Outlet />
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}

export default Root
