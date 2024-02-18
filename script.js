document.getElementById("assetTypeInput").addEventListener("input", function() {
    let assetType = this.value.toLowerCase();
    let businessUnitRow = document.getElementById("businessUnitRow");
    let environmentRow = document.getElementById("environmentRow");

    if (assetType === "management group") {
      businessUnitRow.style.display = "block";
      environmentRow.style.display = "block";
    } else {
      businessUnitRow.style.display = "none";
      environmentRow.style.display = "none";
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
    } else {
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

    let modalBody = document.querySelector(".name-results");

    modalBody.textContent = "..."

    businessUnitRow.style.display = "none";
    environmentRow.style.display = "none";
  }

  function openModalNameGenerated() {
    const modalElement  = document.querySelector('.modalNameGenerated'); 
    let modal = new bootstrap.Modal(modalElement);
    modal.show()
  }
