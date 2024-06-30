function TextInput(props) {
    const { type, value, name, onBlur, onChange, placeholder, error, errormessage } = props;

    return (
        <div className="mb-4">
            <input
                type={type}
                value={value}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">{errormessage}</p>
            )}
        </div>
    );
}

export default TextInput;
