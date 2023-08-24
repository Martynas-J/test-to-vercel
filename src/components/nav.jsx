import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <nav>
            <Link href="/a" prefetch={false}> a</Link>
            <Link href="/" prefetch={false}>home</Link>
        </nav>
    )
}

export default Nav