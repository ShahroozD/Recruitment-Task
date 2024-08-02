
// ---- Library --- //
const appState = [];
let appStateCursor = 0;

const React = {
    root : null,
    
    render: (el, container)=>{
        React.root = container;
        render(el, container)
    },

    createElement: (tag, props, ...children) => {
        if (typeof tag === 'function') {
            return tag(props, ...children);
        }
        const el = {
            tag,
            props,
            children,
        };
        return el;
    },
};

const render = (el, container) => {       
    let domEl;
    if (typeof el === 'string' || typeof el === 'number') {
        domEl = document.createTextNode(String(el));
        container.appendChild(domEl);
        return;
    }

    domEl = document.createElement(el.tag);
    // افزودن ویژگیهای تگ
    let elProps = el.props ? Object.keys(el.props) : null;
    if (elProps && elProps.length > 0) {
        elProps.forEach((prop) => (domEl[prop] = el.props[prop]));
    }
    // افزودن فرزندان داخلی تگ
    if (el.children && el.children.length > 0) {
        el.children.forEach((node) => render(node, domEl));
    }
    container.appendChild(domEl);
};

const reRender = () => {
    console.log('reRendering :)');
    // پاک کردن و رسم دوباره
    React.root.innerHTML = '';
    appStateCursor = 0;
    render(<App />, React.root);
};
  
const useState = (initialState) => {
    // بر اساس اشاره‌گر، متغیر در استک قرار میگیرد
    const stateCursor = appStateCursor;
    appState[stateCursor] = appState[stateCursor] || initialState;

    const setState = (newState) => {

        appState[stateCursor] = newState;
        // با تغییر متغیر صفحه دوباره رسم میشود
        reRender();
    };

    appStateCursor++;

    return [appState[stateCursor], setState];
};

const useEffect = (callback, conditions = []) => {
    // وظیفه شما: این تابع راتکمیل کنید
    // your task: complete this function
};


// ---- Application --- //
const App = () => {
    const [name, setName] = useState('Developer');
    const [count, setCount] = useState(0);
    const [final, setFinal] = useState("Do somthing here!");

    useEffect(() => {
        setFinal(`useEffect response! count: ${count}`);
    }, [count]);


    return (
        <div style="display: grid; gap: 10px; justify-content: center;text-align: center;">
            <div>
                <h2>Hello {name}!</h2>
                <p>Enter Your Name:</p>
                <input
                    type="text"
                    value={name}
                    onchange={(e) => setName(e.target.value)}
                />
            </div>
            <div >
                <h2> Counter value: {count}</h2>
                <div style="display: flex; gap: 10px;justify-content: center;">
                    <button onclick={() => setCount(count + 1)}>+1</button>
                    <button onclick={() => setCount(count - 1)}>-1</button>
                </div>
            </div>
            <div style="padding: 10px; background: #ccc">
                <h2>{final}</h2>
            </div>
        </div>
    );
};


// ---- Application --- //
React.render(<App /> , document.getElementById('app'));