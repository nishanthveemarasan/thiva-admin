const AErrors = ({errors}) => {
    return (
        <ul className="mb-3">
            {errors.map((error, index) => (
                <li key={index} className="text-danger">
                    {error}
                </li>
            ))}
        </ul>
    );
}

export default AErrors;