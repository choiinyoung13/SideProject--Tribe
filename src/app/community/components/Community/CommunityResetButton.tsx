'use client'

import React from 'react'
import Link from 'next/link'
import { useCommunitySortStore } from '@/store/communitySort.store'

type Props = {
    resetHref: string
    className?: string
}

export default function CommunityResetButton({ resetHref, className }: Props) {
    const resetSort = useCommunitySortStore(s => s.reset)
    const defaultClassName = "flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-100 group"

    return (
        <Link
            href={resetHref}
            onClick={() => resetSort()}
            className={className || defaultClassName}
        >
            <svg
                className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
            </svg>
            <span className="hidden sm:inline">초기화</span>
        </Link>
    )
}
