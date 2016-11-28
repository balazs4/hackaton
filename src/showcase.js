import { h } from 'preact';

const Image = ({url, title}) =>
    <img src={url} alt={title} style={{
        "maxWidth": window.innerWidth,
        "maxHeight": window.innerHeight
    }} />

const Showcase = ({source$}, {}) => (
    <div style={{ backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image {...source$} />
    </div>
)

export default Showcase;