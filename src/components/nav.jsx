import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <nav>
            <Link href="/a" > a</Link>
            <Link href="/" >home</Link>
        </nav>
    )
}

export default Nav