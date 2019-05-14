import  React  from  'react';

function Loading({loadingImage}) { 
    return  <div>
            <img className="img-loading" src={loadingImage} alt='loading'></img>
            
        </div>
}

export {Loading}

