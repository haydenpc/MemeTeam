import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "@radix-ui/react-navigation-menu"


export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify between px-5 p-4 shadow-md">
        <h1 className="text-3xl font-bold text-primary logo">MEMETEAM</h1>
      <div className="ml-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
          <Link href="/login" className={navigationMenuTriggerStyle()}>
                  Login
              </Link>
            <NavigationMenuItem>
            <Link href="/signup" className={navigationMenuTriggerStyle()}>
                  Signup
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/team" className={navigationMenuTriggerStyle()}>
                  Teams
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/edit" className={navigationMenuTriggerStyle()}>
                  editor
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    title:string
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"