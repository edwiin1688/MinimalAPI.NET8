const { createApp, ref, computed, reactive } = Vue;

createApp({
    setup() {
        const activeTab = ref('counter');
        const counter = ref(0);
        
        const newTodo = ref('');
        const todos = reactive([
            { text: 'Learn Vue.js', completed: true },
            { text: 'Build a demo', completed: false },
            { text: 'Test Minimal API', completed: false }
        ]);
        const completedCount = computed(() => todos.filter(t => t.completed).length);
        
        const addTodo = () => {
            if (newTodo.value.trim()) {
                todos.push({ text: newTodo.value, completed: false });
                newTodo.value = '';
            }
        };
        const deleteTodo = (index) => todos.splice(index, 1);
        
        const calcDisplay = ref('');
        const calcInput = (val) => calcDisplay.value += val;
        const calcEqual = () => {
            try {
                calcDisplay.value = eval(calcDisplay.value).toString();
            } catch {
                calcDisplay.value = 'Error';
            }
        };
        
        const weatherTemp = ref(25);
        const weatherDesc = ref('Sunny');
        const weatherIcon = ref('☀️');
        const getWeather = () => {
            const conditions = [
                { temp: 30, desc: 'Sunny', icon: '☀️' },
                { temp: 20, desc: 'Cloudy', icon: '☁️' },
                { temp: 15, desc: 'Rainy', icon: '🌧️' },
                { temp: 0, desc: 'Snowy', icon: '❄️' },
                { temp: 25, desc: 'Partly Cloudy', icon: '⛅' },
                { temp: 18, desc: 'Windy', icon: '💨' }
            ];
            const random = conditions[Math.floor(Math.random() * conditions.length)];
            weatherTemp.value = random.temp;
            weatherDesc.value = random.desc;
            weatherIcon.value = random.icon;
        };
        
        const apiUrl = ref('http://localhost:8080/swagger/v1/swagger.json');
        const apiBody = ref('');
        const apiResponse = ref('');
        const testApi = async (method) => {
            try {
                const options = {
                    method,
                    headers: { 'Content-Type': 'application/json' }
                };
                if (method !== 'GET' && method !== 'DELETE' && apiBody.value) {
                    options.body = apiBody.value;
                }
                const res = await fetch(apiUrl.value, options);
                const data = await res.text();
                apiResponse.value = `Status: ${res.status}\n\n${data}`;
            } catch (err) {
                apiResponse.value = `Error: ${err.message}`;
            }
        };
        
        const countV2 = ref(0);
        const step = ref(1);
        
        return {
            activeTab, counter,
            newTodo, todos, completedCount, addTodo, deleteTodo,
            calcDisplay, calcInput, calcEqual,
            weatherTemp, weatherDesc, weatherIcon, getWeather,
            apiUrl, apiBody, apiResponse, testApi,
            countV2, step
        };
    }
}).mount('#app');
