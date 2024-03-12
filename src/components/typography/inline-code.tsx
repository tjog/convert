
interface InlineCodeProps {
    children: React.ReactNode
}

function InlineCode({ children }: InlineCodeProps) {
    return (
        <code className="relative rounded bg-muted px-[0.2rem] py-[0.15rem] font-mono text-[85%] font-semibold">
            {children}
        </code>
    )
}

export default InlineCode;
