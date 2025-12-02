'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type UnderlineProps = {
    left: number;
    width: number;
};

type NavigationContextType = {
    registerItem: (key: string, ref: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement) => void;
    activateItem: (key: string, groupHovered?: boolean) => void;
    setActiveKey: (key: string) => void;
    deactivate: () => void;
    setIsInvertColor: (invert: boolean) => void;
    setGroupHovered: (hovered: boolean) => void;
    setScrolling: (values: { scrollDown: boolean; scrollUp: boolean }) => void;
    setUnderline: (underline: UnderlineProps | null) => void;
    scrolling: { scrollDown: boolean; scrollUp: boolean };
    groupHovered: boolean;
    isInvertColor: boolean;
    hoveredKey: string | null;
    activeKey: string | null;
    underline: UnderlineProps | null;
    containerRef: React.RefObject<HTMLDivElement | null>;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavUnderline must be used within a NavUnderlineProvider');
    }
    return context;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<{ [key: string]: HTMLDivElement }>({});
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [underline, setUnderline] = useState<UnderlineProps | null>(null);
    const [groupHovered, setGroupHovered] = useState(false);
    const [isInvertColor, setIsInvertColor] = useState(false);
    const [scrolling, setScrolling] = useState({ scrollDown: false, scrollUp: false });

    const registerItem = useCallback((key: string, ref: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement) => {
        itemRefs.current[key] = ref as HTMLDivElement;
    }, []);

    const activateItem = useCallback((key: string, groupHovered?: boolean) => {
        const el = itemRefs.current[key];
        const container = containerRef.current;
        if (el && container) {
            const elRect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            setUnderline({
                left: elRect.left - containerRect.left,
                width: elRect.width,
            });
            setHoveredKey(key);
            setGroupHovered(groupHovered ?? false);
        }
    }, []);

    const deactivate = useCallback(() => {
        setHoveredKey(null);
        setGroupHovered(false);

        const el = activeKey ? itemRefs.current[activeKey] : null;
        const container = containerRef.current;

        if (el && container) {
            const elRect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            setUnderline({
                left: elRect.left - containerRect.left,
                width: elRect.width,
            });
        } else {
            setUnderline(null); // aktif key de yoksa çizgiyi kaldır
        }
    }, [activeKey]);

    const value = useMemo(
        () => ({
            registerItem,
            activateItem,
            setActiveKey,
            deactivate,
            setIsInvertColor,
            setGroupHovered,
            setScrolling,
            setUnderline,
            underline,
            scrolling,
            groupHovered,
            isInvertColor,
            hoveredKey,
            activeKey,
            containerRef,
        }),
        [registerItem, activateItem, deactivate, scrolling, groupHovered, isInvertColor, hoveredKey, activeKey, underline],
    );

    return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}