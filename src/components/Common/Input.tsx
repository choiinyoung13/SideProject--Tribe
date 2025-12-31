interface InputType {
  type: 'text' | 'password'
  placeholder: string
}

export default function Input({ type, placeholder }: InputType) {
  return (
    <input
      className="px-[12px] py-[10px] text-[1rem] w-full bg-[rgb(245,245,245)] border border-[rgba(220,220,220,1)] rounded-[6px] max-[1450px]:w-[300px] max-[600px]:text-[0.8rem] max-[600px]:mx-auto max-[600px]:mb-[14px]"
      autoComplete="off"
      type={type}
      placeholder={placeholder}
      maxLength={30}
    />
  )
}
