export default function TestPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Test Page</h1>
            <p>Frontend is working!</p>
            <p>Environment: {process.env.NODE_ENV}</p>
            <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'Not set'}</p>
        </div>
    );
} 