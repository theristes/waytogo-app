import  React  from  'react';

function Error({errorMessage, errorImage}) { 
return  <div>
            <img className="img-error" src={errorImage} alt='loading'></img>
            <span className="error-label">Error {errorMessage}! </span>
        </div>
}

export {Error}
