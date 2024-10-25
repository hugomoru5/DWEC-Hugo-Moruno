export 
{
    get
};

function get(url, onOk) 
{
    fetch(url)
        .then(response => response.json())
        .then(recetas => {
            onOk(recetas);
        });
}