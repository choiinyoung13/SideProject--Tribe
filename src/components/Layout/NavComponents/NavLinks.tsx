import Link from 'next/link'

export default function NavLinks() {
  return (
    <ul className="flex list-none m-0 p-0 max-[1000px]:hidden">
      <li className="ml-[150px] max-[1024px]:ml-[110px]">
        <Link
          href="/"
          className="text-[rgba(20,20,20,1)] text-[1rem] font-bold no-underline"
        >
          HOME
        </Link>
      </li>
      <li className="ml-[50px]">
        <Link
          href="/shop"
          className="text-[rgba(20,20,20,1)] text-[1rem] font-bold no-underline"
        >
          SHOP
        </Link>
      </li>
      <li className="ml-[50px]">
        <Link
          href="/community"
          className="text-[rgba(20,20,20,1)] text-[1rem] font-bold no-underline"
        >
          COMMUNITY
        </Link>
      </li>
    </ul>
  )
}
