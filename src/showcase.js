import { h } from 'preact';

const Showcase = ({source$: {title = "", url = "#"} = {}}, {}) => (
    <div>
        <h3>{title}</h3>
        <img src={url} alt={title} style={{ width: "50%", height: "50%"  }}/>
    </div>
)

export default Showcase;