document.getElementById("assetTypeInput").addEventListener("input", function() {
    let assetType = this.value.toLowerCase();
    let businessUnitRow = document.getElementById("businessUnitRow");
    let environmentRow = document.getElementById("environmentRow");
    let purposeRow = document.getElementById("purposeRow");
    let numberRow = document.getElementById("numberRow");

    if (assetType === "management group") {
      businessUnitRow.style.display = "block";
      environmentRow.style.display = "block";
    } else if (assetType === "subscription"){
      businessUnitRow.style.display = "block";
      purposeRow.style.display = "block";
      numberRow.style.display = "block";
    } else {
      businessUnitRow.style.display = "none";
      environmentRow.style.display = "none";
      purposeRow.style.display = "none";
      numberRow.style.display = "none";
    }
  });

  function abbreviateWord(word) {
      if (word.length <= 4) {
          return word;
      } else {
        let arrayNumbers = []
        let wasLastNumber = false
        for (let i=0; i < word.length; i++){
          if (!isNaN(word[i])) {
            arrayNumbers.push(word[i])
            wasLastNumber = true
          } else {
            wasLastNumber = false
          }
        }
        
        if (arrayNumbers.length === 1 && arrayNumbers[0] != word[word.length-1]){
          let forthLetter = word[3].toLowerCase();
          if (forthLetter === "a" || forthLetter === "e" || forthLetter === "i" || forthLetter === "o" || forthLetter === "u") {
              return word.substring(0, 3);
          } else {
              return word.substring(0, 4);
          }
        } else {
          let forthLetter = word[3].toLowerCase();
          if (forthLetter === "a" || forthLetter === "e" || forthLetter === "i" || forthLetter === "o" || forthLetter === "u") {
            let abbreviatedWord = word.substring(0, 3)
            abbreviatedWord += arrayNumbers.join("")
            return abbreviatedWord
          } else {
            let abbreviatedWord = word.substring(0, 4)
            abbreviatedWord += arrayNumbers.join("")
            return abbreviatedWord
          }
        }

      }
  }

  function generateName() {
    let assetType = document.getElementById("assetTypeInput")
    
    assetType = assetType.value.toLowerCase()

    if (assetType === "management group") {
      generateManagementGroup()
    } else if (assetType === "subscription") {
      generateSubscription()
    }
  }

  function generateManagementGroup() {
      let areaInput = document.getElementById("businessUnit").value;
      let environmentInput = document.getElementById("environmentInput").value
      let checkArea = document.getElementById("checkBusinessUnit");
      let environmentCheck = document.getElementById("checkEnvironment")
      let areaString
      let environmentString

      if (environmentCheck.checked) {
        environmentString = abbreviateWord(environmentInput);
      } else {
        environmentString = environmentInput
      }
      if (checkArea.checked) {
        areaString = abbreviateWord(areaInput);
      } else {
        areaString = areaInput
      }

      if (areaString && environmentString) {
        let managementGroup = "mg-" + areaString + "-" + environmentString;
        let modalBody = document.querySelector(".name-results");

        modalBody.textContent = managementGroup
        openModalNameGenerated()
        const toastElement  = document.getElementById('toastCopySucess'); 
        let toast = new bootstrap.Toast(toastElement);
        toast.show()
      } else {
        const toastElement  = document.getElementById('toastCopyErrorManagementGroup'); 
        let toast = new bootstrap.Toast(toastElement);
        toast.show()
      }
  }

  function generateSubscription() {
    let areaInput = document.getElementById("businessUnit").value;
    let checkArea = document.getElementById("checkBusinessUnit");
    let purposeInput = document.getElementById("purposeInput").value;
    let checkPurpose = document.getElementById("checkPurpose");
    let numberInput = document.getElementById("numberInput").value;
    let checkNumber = document.getElementById("checkNumber");
    let areaString
    let purposeString
    let numberString

    if (checkArea.checked) {
      areaString = abbreviateWord(areaInput);
    } else {
      areaString = areaInput
    }
    if (checkPurpose.checked) {
      purposeString = abbreviateWord(purposeInput);
    } else {
      purposeString = purposeInput
    }
    if (checkNumber.checked) {
      numberString = abbreviateWord(numberInput);
    } else {
      numberString = numberInput
    }

    if (areaString) {
      let subscription = areaString + "-" + purposeString + "-" + numberString
      let modalBody = document.querySelector(".name-results");

      modalBody.textContent = subscription
      openModalNameGenerated()
      const toastElement  = document.getElementById('toastCopySucess'); 
      let toast = new bootstrap.Toast(toastElement);
      toast.show()
    } else {
      const toastElement  = document.getElementById('toastCopyErrorSubscription'); 
      let toast = new bootstrap.Toast(toastElement);
      toast.show()
    }
}

  function copyResults() {
    let modalBodyText = document.querySelector(".name-results").textContent;

    navigator.clipboard.writeText(modalBodyText)
    .then(() => {
      clearForm()
      })
  }

  function closeModalResults() {
    clearForm()
  }

  function clearForm() {
    document.getElementById("assetTypeInput").value = "";
    document.getElementById("businessUnit").value = "";
    document.getElementById("environmentInput").value = "";
    document.getElementById("purposeInput").value = "";
    document.getElementById("numberInput").value = "";

    let modalBody = document.querySelector(".name-results");

    modalBody.textContent = "..."

    businessUnitRow.style.display = "none";
    environmentRow.style.display = "none";
    purposeRow.style.display = "none";
    numberRow.style.display = "none";
  }

  function openModalNameGenerated() {
    const modalElement  = document.querySelector('.modalNameGenerated'); 
    let modal = new bootstrap.Modal(modalElement);
    modal.show()
  }
