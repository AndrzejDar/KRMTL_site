export async function fetcher(url, option={}){
    let response;
    if(!option){
        response = await fetch(url);
    } else {
        response = await fetch(url, option);
    }
    const data = await response.json();
    console.log('incoming:');
    console.log(data);
    return data;
}