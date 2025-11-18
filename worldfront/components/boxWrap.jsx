'use client'

import {cn} from "@/lib/utils";
import {forwardRef} from "react";


const Section = forwardRef(({className, children, ...props}, ref) => (
    <section ref={ref} className={cn("pt-6 pb-6 pl-6 pr-6", className)} {...props}>{children}</section>
));

export {Section};