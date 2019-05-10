import  React  from  'react';

function Loading({loadingImage}) { 
    return  <div>
            <img className="img-loading" src={loadingImage} alt='loading'></img>
            <span className="loading-label">Loading...</span>
        </div>
}

export {Loading}

