import Part from "./Part";
import Total from "./Total";

const Content = ({parts}) =>
    <>
        <ul>
            {parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
            <Total parts={parts}/>
        </ul>

    </>

export default Content