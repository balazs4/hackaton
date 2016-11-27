import {h} from 'preact';

const Showcase = ({source$}, {}) =>(
    <div>
        <pre>{JSON.stringify(source$)}</pre>
    </div>
) 

export default Showcase;