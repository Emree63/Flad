import Conversation from "../../../models/Conversation";
import Message from "../../../models/Message";
import IMessageService from "../interfaces/IMessageService";

export default class StubMessageService implements IMessageService {

    getRandomDate(): Date {
        const startDate = new Date(2022, 0, 1); // Jan 1, 2022
        const endDate = new Date(); // Current date
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        return randomDate;
    }

    private messages: { id: string, message: Message }[] = [
        { id: "1", message: new Message("1", "Hello", "User1", this.getRandomDate(), "https://p.scdn.co/mp3-preview/d2cdc7726fcdc244849620b427a0c37461bb3586?cid=eb2aab666a43490f82eef0bb064d363f") },
        { id: "2", message: new Message("2", "Hi there!", "User2", new Date()) },
        { id: "3", message: new Message("3", "Greetings", "User3", this.getRandomDate()) },
        { id: "1", message: new Message("4", "La chiennete", "User0", this.getRandomDate()) },
        { id: "2", message: new Message("5", "Grr paw", "User2", new Date()) },
        { id: "3", message: new Message("6", "Greetings", "User3", this.getRandomDate()) },
    ];

    private conversations: Conversation[] = [
        new Conversation("1", "Imri", "https://i1.sndcdn.com/artworks-ncJnbnDbNOFd-0-t500x500.jpg", this.messages[0].message),
        new Conversation("2", "Dave", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAACIWSURBVHgB7d2Jcty2tgXQTizP8/AR+f/v8mzHc3Jf7fZjotiSLIFgN4mzVlWXb6pueZAoYuPgAPjtjz/++N8OACjl9x0AUI4AAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFCQAAUJAAAAAFneyAIV27du2fz8nJye7333//z+e333775zP53//+95/P33//vf/89ddf/3y+ffu2/xXYNgEABpAB/caNG7vr16/vP9OAf1U/BoLzJBwkCHz9+nX/+fLli1AAGyMAwAZlkM6Af/Pmzf2vGfAP/edPYWOSAJAgkM/nz5/3lQNgvQQA2IgMurdu3dp/MuhfZqZ+SFlquH379v4TqQx8+vRp/1EdgPURAGDlMsu/c+fOKgf9i0wVgvv37++rAh8/ftyHgSwfAMcnAMAKZf0+g35m05lZb13CSz4JAwkC+aSHADgeAQBWJIP9vXv39mX+Lc32LyvB5u7du/tPqgF//vnnfqkAODwBAFZg9IH/LFM/Q5YH3r9/v/8VOBwBAI4oM+KUxSsN/D/K0sCTJ0/2FYEEAUsDcBgCABxBBvupFF514P/RVBH48OHDPgjYRgjLEgDgwNLV/+DBgyGa+5aQ5scEgYSAhAFgGQIAHEjK/Rn4M7hxselrlV0Qb968sSwAC3AZEBxABv1nz54Z/K8o5wg8ffp0XxUA+lIBgAVlfX+ayR5bDuCZLvSZLvqZLv2ZnL4gaLo0KEsVLfcK9DJ9DROeUg1wqiD0IQDAQnI+/6NHjw5+Tn+cvqgn/zufOU11UxCYLhqafj1kA2N2C6QakBCQuwaAeQQAWEBmqw8fPjzYAJlZcQbF6TKe3h3007XApw/tmS4kmi4lOkTQSRB5/PjxvkEwH6CdAACdZV9/tvctLYP+dNnOMU7Ty9JBQkc+796921cIEnyy3LF0GMihSalCvH792t0C0Oi3P/74w08PdJAZcUr+mQ0vJYNdBvycpb/mk/MyOCcMpHlvySpIljZevXqlLwAaqABABylNZ/BPOXwJKb9nT3wG/i0MdlP/Qcr0qQhkxr5EI2EqDTlF8OXLl0IAXJEAADOl9J116SXK3tPAn0tztljqzt95Ci6pCCQI9D4AKb9fmgNTCXCxEFyeAAAzZPDJDLT3oJaBM4P+Vgf+H+XfkBCQ5YslKgL5vfJ9SE+AHQJwOQIANFpq8M9AmdL5iCXt0xWBhICePQJTD4YQAJfjJEBosMTgnwE/ZewKh90kCGTnwIsXL7qW7acQkCZE4GICAFzRVG7uOfhnVvz8+fNyM9d08ScEJAz0WupICMj35xgHMMGWCABwBRlc0vDXa/BPk19m/W/fvi29nz29DgkCvS796f19ghEJAHAFPcvL2cefQc969XdTNSD9AT1MyzSHPK4YtkQAgEvKCX+9DvnJjNfe9Z+lCpIeiF4VkWmLJvAzAQAuId3qPY73zaCWwS1r3pwvPRFZGulxp0EOZ8ptgsB/CQDwCxlAMvufK4N/tqhlcOPXpiWSHlWSBLg1XMkMayIAwAXS8d/jVr/MZFPyt95/NRn8ey2VpApgZwD8SwCAC2Twn9tJPg3+jqltk8G/xw6B6YwATYHwnQAA50jZeG7T3zT499reVlWvr2MqAPoB4DsBAM6QgWLuun/W/A3+/UwhYO5yQHoBlryyGbZCAIAzzF33z+CfLnaDf1+9QkCqAJYCqE4AgB9ku9/cw37S7Z8udvrL4J+v75xzAtLXYSmA6gQAOCUDQ26pmyM3+en2X1YaKueGgCwFZIsnVCUAwClZ959TGs599wkALC8hKycqztFjiydslQAA/y+NYbdu3dq1Smk6x9hyOHOrLan4ZLcHVCQAwO77HvE5Xf9T01/lG/2OJUsBc5oC0/ORA5+gGk897L6vB885JS5n++v4P47pAqHW8JXBv8dRz7A1AgDlZfY/p/Ev3f7O9z+uud+DBMC5Jz7C1ggAlJeXf2sJeJp9cnzpB5hThZm7+wO2RgCgtLmz/5T+e1xUw3zTVcutVAGoRgCgtDmz/+xFV/pflywFfPz4cddKFYBKBADKmjv7nzPbZDmpyuTI4BaqAFQiAFBW9vy3zv5z4I/rfdcpg/+cyky2BUIFAgBltR4Ak7XmzDJZr5wQ2NqbkWDodEAqEAAoKZf9tF74k9mlxr91S0hrPZI5VaEsBcDoBABKai3zZmCZe/48h5FmwNZtgY4HpgIBgHJS3s25/y0y+29tMOPwWsNaToWceyU0rJ0AQDkp77au8c7ZYsbhpVmzNbCpAjA6AYByWtd3M5g4739bsmTTuiOgtUoEWyEAUEr2eLeWds3+tynft5aLgtIMKAQwMgGAUrLFq0W6/ufcO8/xzPnetT4vsAUCAKW0vtAd+bttrdUbFQBGJgBQRkq6yv81pQLQcnaDZQBGJgBQRuuLPIOHrX/blybOFjdu3NjBiAQAymh9kbcOHKxL6/dRBYBRCQCUMacCwPbl8qaWZYAcCtR6aRSsmaeaElpf4hk0lP/H8eXLl10LywCMSACghNYXuNn/WPQBwL8EAEpo7f4XAMaSCkDLoUACACMSACihJQBkoMgSAOPI97TlOOcsIbXeHwFrJQAwvLy48wK/qtb1Ytat9fva8gzBmgkADK+1/G/2P6bW76vrgRmNAMDwWmduAsCYWr+vKgCMRgBgeAIAp+UsgJatnQIAoxEAGF7LizsDhP3/42ptBISRCAAM79q1a7urahkg2I6W6k4OkrITgJEIAAyv5QRAAWBsLUcCR0uYhLUSABha66ytdYBgGwQAEAAYXOsLWwAYmwAAAgCDa31hawAcW2sAcCsgI/E0M7TWpi0VgLHlSOCWOwEEAEbiaWZorS9sFYDxtXyPBQBG4mlmaK0v7JbZIdvSEgBsA2QkAgD8wOy/hpaQJwAwEgGAobVUAMz+axAAqE4AAEoS9KhOAACAggQAAChIAACAggQAoCQNfVQnADA0e705T8v3WeMgIxEA4AdOe6tBAKA6bzqG1nqojyrA+AQAqhMAGFrrC1sVYHwt32OnRDISbzmG1vrCFgDGltm/AEB13nIMrfWFfe3atR3jckskCAAM7q+//tq1EADG1vr9FQAYiQDA0FQAOEvr97c1UMIaCQAMLU2ALS9tAWBsJycnuxYCACMRABhey0u7dYBgG1q+v6kmWQJgJAIAw/v27dvuqlIBsBNgXC0BwOyf0XjDMbyWABCqAGNKsGtZ4ml9jmCtBACG1/rivn79+o7xtAY7AYDRCAAMTwDgtBs3buxaCACMRgBgeGncalm/bR0oWLfW7+vXr193MBIBgBJaXt5ZK9YHMJYcAdxS2cns3w4ARiMAUELr7O3mzZs7xpHBv+UWQLN/RiQAUMKXL192LSwDjKU10AkAjEgAoIS8wFuuBs6A0TJjZJ1u3bq1a9EaIGHNBADKaH2JWwYYQ/b+t+z/TwOpHQCMSACgjM+fP+9atM4aWZfbt2/vWpj9MyoBgDLmBADLANvXGgA+ffq0gxEJAJQxp5SrCrBt6f5vKf+nb0QFgFEJAJTSWgW4c+fOju1q/f5l8G9pHoUtEAAopbWcmxmko4G3Kcs3rRUc5X9GJgBQSrYDti4DqAJsU9b+W3o4MvMXABiZAEA5Hz9+3LXQDLhNd+/e3bXIcpHyPyMTACgns7qWF3sG/9bBhOPIGQ4tzX/RGhRhKwQAyslugNbO7iwDqAJsx71793Yt8oy0NozCVggAlPThw4ddi9wQqAqwDZn9tzZumv1TgQBASZndZZbXQhVgG1pn/1keag2IsCUCAGXNqQK0Di4cRjr/W2f/CYd///33DkYnAFBWAkDriz7LAK3NZSwr1Zn79+/vWr1//34HFQgAlJVS75y13gcPHuxYn4SzVGlaZPbv5j+qEAAo7c8//2ze650mM1cFr8vJycmsJs08D1CFAEBpWQKY0/CVKoCGwPWY8/3I1lAX/1CJAEB5c6oA6QOwFLAO2Z1x48aNXat3797toBIBgPJSBZhT+k3HuaWA40oQm9P4l9Mhc08EVCIAwO57FWDO1q+HDx/aFXAkKfk/evSoufSf6o/OfyoSAGD3fRCYUwJO13lCAIeXMxnmXNWcnSA6/6lIAID/l4FgThk4688OCDqs3NA4p+s/VR+zf6oSAOCUt2/fzroCNgEggxLLy5a/uVWXVH2c+kdVAgCckgrA3HPgMyjNKUnza+m3ePz48awtmNny59IfKhMA4AcpCbdeFBQZlDI4aQpcxtT0N+frmyrPmzdvdlCZAAA/6DE4pCnwyZMnQkBn0+A/t8KS0v+ckLek/BvTT5JzDbLFNP/bYVMs4WQH/CTl4WwNnNNgNpWpX758aZ25g2nwn3vmQr63a7zuN6ExZxmkh+THAT/PT5YrUp2a06MCp6kAwDnysp17OEwa1VIJaL2chu96Df4ZSNdY+s8s/9mzZ/sZ/1mz/Tw/CaP5/8w57RBO81aCc0xLAXNnXFMIsBzQptfgH/l+rq30n+cjlaLLhMQ8Q3mW3EFBDwIAXCAHxPSYMQoBbaaGyh6Dfyo6ue53bbJr5KqDefoDVAOYSwCAX8g58T2uic3g//TpUy/tS+r59crAv8YDfxJsWhsaVQOYSwCAS0jXeI/ZY8q8mdFmrZfzZUDL4JbKyVwp+b9+/Xq3Rj0qG6oBtBIA4JIyiPQ4Mz6DW8q+Zm7nS8Nbj+WSNP1lF8ZaO+d7HRg1VQOyi8AzxWUJAHBJGURevXrVrYksMzd9AT9LdaTHnQr5fiW0rXW//xISnLJs4iRKLkMAgCvIYJIQ0Gtff17UKd8mDPC9JJ7KyFzT4J89/9Vk2SQhQDWAXxEA4IqyDJDBpVdZOS/pDHrVqwFZw852vx6DVnZurLHj/5BSDejVR8GYBABokJllzxAQ02EwKX9Xm7kl+PQa/HOjY3ZubMHS3+dUmFINqPhM8WsCADTKDLN3CMhLOlsOKx33Oh30M/e0xHzNMviv8Zjf8xxiUM6fkQCgGsCPBACYISEgPQHOZ2+XUvXcprXp1MYtDf6HphrAjwQAmCnLAS9evCjVbd7TnAuXYmr420rZ/5hUAzhNAIAO0hiY/eZCwNXNmY1O+/yrN/xdlWoAIQBAJxn8nz9/bjA6kISuVF7m3thYlWoAAgB0NB0W1OPuAM6Xcr9llz5UA+oSAGABuTtAc2B/+Xrma9t790V1qgE1CQCwkCwFZElAibqPzPaz3l+9upLnaqmGx6kaMLcxk20QAGBBBq1+Pn78KEztvjc+pgKST68jqU9LNSDHCCcIqAaMTQCAhaVUrTGQ3lIFSIVp6WqAeyrGJQAAHElL093p3oepGpBDkJaqBrinYlwCAMCGnNX8mOWR7IpYqtI03VOhGjAWAQBgANNV1akGLLFDQjVgPAIAwEBSDUhvQI6oXoJqwDgEAIDBTLtPcjuiagDnEQAABpXbEZeuBuQAIbZJAAAY2JLVgPzeOZmRbRIAAApYohqQULHE9kMOQwAAKKJnNSDNhg642jYBAKCYudWABImECLZNAAA4kmNevzunGrDUWQMclgAAcCRzjwLuIdWAnCJ42YuW8v9falcBhyUAABT37du3fQhIR/9FAUPX/1gEAAD2cm31RdUApf+xCAAA/CPVgPQGvH///j+DvdL/eE52wKJu3769u3///o55Tk68rg4lA38CwKdPn3YPHz7c/f7770r/A/ITBQvJMakZ+K9fv75jvlu3bu3Pnk8ZOmvRLG+qBiQAKP2PRwCAznI5Ss5Hz8yfvhKqphCgHH0YGfgFrjEJANBJtnTdvXt3/znm/u7RJWA9fvx4X5LOujTQRgCADlKeTrnf1aiHMV1Hm+WVpa68hdEJADBDGtMyEKU0zeFlmSUh4NWrV8rUcEW2AUKDaQb69OlTg/+RJYQ9e/Zsd/Pmzd2WtC4TqXbQiwoAXNG0zp/OaNYhg2n6AnKQzejb1QQAehEA4JIy08+s33709Uowy5LA69ev3VMPv2AKA7+Qxr4chpLtZ0sP/pe9kGUkvbfzJahZmoFfM5WBcxxyW19mqyldf/z4cVdNGvhybkK+zr1MWwVTCfj8+fMO+JkAAGdIQ1m29S094896bgb9X93CNrL8u/PvT/UjlZZeYSu/b06yA84mAMAph9zWl9K3Y23/lXPnM2Bn5j73PIUM/pn9+9rC+QQA2H0v96cMfefOncXL/RnkMuNVmv5ZvjbPnz/fVwJyuFKrXGTjqGC4mABAeYc6xS/r/NmmluNrbeU63zR7T09AQtlVA1mCVb7OwMUEAMo6ZLk/6/yZlSpJX14G8akv4LLhLF/fhAfg1wQAyjlkuT8DWM6qr7i9r4eU8XMdbULAr4JaKgfZUaC6ApcjAFBKuvsz61+63J+ZaGb8Fbf19Zav5WW2Cqahcktd/60nSQo49CIAUEJetplFLn1efF7OWePP4O9F3c+vtgrma55dBMDlCQAMr7WZ7KrSfJZyv3X+5Zy1VTDLBKOf/w9LEAAYVs6En+6MX5JtfYd1eqtg+gJS+ldtgasTABjOoZr8pm19tpwd3rRVMFUAFRdoIwAwlEM1+dnWtw6+/tBOAGAIafLLYT63b9/eLSnl56zzO2UO2DoBgM3LoJ/Bv3Vb1WWk3J8Zf7rNAUYgALBZh9raN23rSwgAGIUAwCYdYtbvFD9gZAIAm3KIWb9yP2tmyyO9CABsRgb9DP5LzvrT3Z89/cr9LK11i6oAQC8CAKuXF2W29i3Z4a+7H6hGAGDVcorfo0ePFtvXn9lUyv0O8wGqEQBYren2t6VO83N2P1CZAMDqZI0/s/5f3f/eKuv7GfjdHldXKkrTJ89bPgmaU9jMM5LqUH7NJyExy0TW3xmJAMCqLN3olya/DP5e5HVkUM9SUgJlPicnJ83PV4JAtoWmVySfhALYKgGA1ci+/pT8l6DJr5YM+gmTaRzNoN9rGWmqGty6dWv/3wkEqSTl47wItkYA4OiWLPlnpj+d5GfWP77M7nMLZAboJbeLThIGElrzScjMs5Yqk2eNLRAAOKoM+in5L9Hlnxdy7oo3MxtfnqM0jS7VN3IZCR/Zrpq/R0JAdpY4T4I1EwA4mpRn88Ls3eVv1l9HgmOeoaXvg7iKVB5SEUglYjpR0nPIGgkAHEVe2nlB9mbWX0NCY2baeYaW2iY6V/5e6WvJ3zHP5I/9J04C5NgEAA4qL72s9/eesZn115GO/iwbpeS+BalSPHny5KcdKGsNLtQhAHAweRE+fvy4+4s7ndhnzbAYT0rrmflvcfCcdiS8fv1ahYpVEAA4iAz6Gfx7N/vZ119DBvzM+qftd1s1VQMSWDUIcmwCAItLuT9l/56ztgz4GfgTABhbmuoSHlP6H8G0DJajqOGYBAAWtcTgn/JpyqjO8B/fNGNe6jKoY1rTzgVqEgBYTMq1Kdv2HPzT6Pfu3Tsl/wJGHvxhDQQAFpGtT9nq10sG/KybusCnhpT9Dzn45/maPtOfr0uf0QkAdNd78M/e/levXin5F5GBd4mG0Umeo+wYyVJSPvnvsxry8vdIEEgDa/oPpguFBANGIQDQ1XS6Xy+Z8Wfmr+RfR5aNejf8ZYBPw+hVLu3JM5dwkM/UsLfUJUNwDAIA3eTF2HPwz6E++VBH9vn33OqX6lHO5O+1WyShYLr9LxWKVLvWfBohXEQAoIue3f7W+2tKqT2H/PSQGf90Dv9SUhlIQ2oCRoLvoc4ocH4AvQgAzJYXd6/BPy9VJ6XVMx300+MZSrn+kAft5M/JM7vkzZawhOUvzGZo0/G+vQb/ly9fGvwLSul/7rr/dDhUGkaPMUtOY+GLFy8c8MNmCAA0m0406zHjmV6eOv3ryfOTADBHBvwM/EuW/K/y98iyAKydJQCaZfDv0a2dGVNKqDr9a8qVuXMqSBl0UzlKw99aTIdV9eppgCWoANAkM7YeR5ka/GtL/8ic5rk8N2sb/Cd2sbB2AgBXlmanHjMbgz9znqM8Nym3r3HwnyQAuLCKtRIAuJKcjNajW9vgT9b+58z+U2ZP78japTFRYytrJABwJT22ORn8iRyg0yrP0LEb/i5rOtfC887aCABcWl7Yc9f9M2Mz+JMKUo7TbTFt99uSLFPoB2BtBAAuJbP+dGvPMR3yY/AnfSRZTmqR0v8Wt4tma+Ca+xWoRwDgUuau+0+H/DjGlGhd+58u9dmqhJe5BGh6EQD4penms1bTGqhDfpi0LiWljL7lATC9C6oArIUAwIVSpp1b+t9KtzaHkcOjWsr/W5/9T5wSyFoIAFwo+7Rb12ojL+ytdGtzGK3VpNwOOUL5O/8OS2GsgQDAuXJKW2undqTUubVubZbXenz0KNdDJ8SoiLEGAgDnyuy/tfEvLzkd/5ylJQBkxjzSoOnGQNZAAOBMc89oT7OWZid+lEDZcpDUaDNmAYA1EAA405wz2nPsqUYnztJ6iuRoR+mmomFXDMcmAPCTObP/acsfnKU1AIxYTWoNNZbV6EUA4CdzZv/p+Ff65zytO0pGnC23/pvsIKAXAYD/mHNDW15MzjvnIq0BYMRBr/XfNPcmTpgIAPzHnBvatn5KG8trHbwEgH/NOZcDTvMk8Y85N7Sl7D/CKW0AVQgA/COl/9bZRbr+zf4BtkMA4B+ts/80M41yShvrNOK695xDtqAHAYC9NP+1ntFu9s9laXz7V2u1zc8avQgA7FW9n53Dag0ArecHrFnLvymDvwBALwIAe60BIIO/FxKX1RoAcjjVaFr+TU4PpCcBgP1MpPWGNrN/rqL1kKjW53OtsqQhAHBsAgC7mzdv7lrkKFOn/nEVqQC0VIxa+1PWKoN/S1+DAEBPAgDNAUDnPy1azsDPgDlSH8Cc0A29CADFZRbSOrtS/qdFa9VozvXUa9O65VYAoCcBoLisrbaUInM/u0tJaJFnp8UoASA/cy3VjPy8WXKjJwGguNbZ/+fPn3fQIgGgpQ8gA+cIvQCt9220Bic4jwBQXGt3tQBAqzkz2TmXVa1BDv9prWT4maM3AaC4lhmVUiRztTaQZvDc8pbAe/fuNZ9qKADQmwBQWOtWJKVI5koAaD1A6v79+7stys9ba/NfBn89N/QmABTWOpMSAJgr+9lbO9pTtWodSI/p4cOHzbP/Dx8+7KA3AaCw1uNVBQB6mDOoPXjwYFPnAqT03xq4M/P3M8cSBIDCWgJAyrbW/+khywCtz1Jm0o8fP97ELYE59Ofu3bu7Vm7bZCkCQGEtAcDgT08Z3Frl+X306NFuzVKlyN+xNahk9q/8z1IEgKLyQmopoQoA9JTTJOc8U5ldrzUE5OfryZMns6oUGfzN/lmKAFBU6/qpAEBvc6oAka2Bc2bZS0h1IoP/nD6FzP7nfm3gIgJAUa0NgAIAvaUKMLfJLSEgPQE5aOfYUpV4+vTp7CbFd+/emf2zKAGgqNaXk+tIWcLbt29nD3bZHpiB95jHBeeMgh7ViAQil22xNAGgqNaZkgDAElJZev/+/W6uad092wQPuSSQLX4JH+n2n/vnJgi9efNmB0trqwOzea23kSlJspSsd6d83mMGnzsDsiyQUJGZ9FLPbX6Ossc/f1avwJFqiKDNIQgARbVUALyUWFpmvplJ91jLz++RSkAG6ISLBIFex+lOpxH2HPgjf0elfw5FACiq5QXrLHKWlpD5+vXrrof85FnP2nw+WVvPufr5XKWhNb/HdB1xBv0lTiHM3y2zfzgUAaAoFQDWKgNhKgFL7O/PAJ5PwsB0qmU+Cbenl7jy85FPBvrsmMn/XrKnID9b+TdbYuOQBICiWl5mXk4cSo4Jzja4JW/+y89AZvXHvl44g//Lly8FbA7OLoCC8uJrCQCWADikrNv32BmwZgZ/jkkAKKi1lKkCwKElAPQ4I2CNDP4cmyWAggQAtiTn4WeQXNtxv3OkzyHNjqpqHJMKQEFzbiaDY0jX/osXL4aYLSfQvHr1ys8TRycAAJuQbv3nz5/vGwS3KAN+Zv2jLmmwPZYACmo9ZMVLi2PLM5hBNHvxc8jPGi7/uYxUMJzwx9oIAMDmpAqQdfSc8pcT+dbaG5ABP9sZt1q1YGwCALBJKalnVp019ek8/rXI3y1/r2xlVDljrQQAYNPSG5BlgZzYl9v4ep/Pf9W/S87yz+Bv4GftBABgCBl8c5xuSu7TRT2HOOUvA33W+DPw51fYCgEAGErK7ym955Oz/BMEpjsAelUGsrY/XSqUXgSzfbZIACiodf/xKIewUEcG6ikMRJYJpvP/Ew7ymS7++VEG9emSoFQX8nvl169fv+rmZwgCQFF5icU0c5lCwUX/fZXrU2GNptv/Uq7/0emAa0ZPBQJAQXkB5lQ14F8GfapxEiAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBBAgAAFCQAAEBB/wf3WpX7rvpIVgAAAABJRU5ErkJggg==", this.messages[1].message),
        new Conversation("3", "Benzema", "data:image/png;base64,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", this.messages[2].message),
    ];

    getConversations(): Promise<Conversation[]> {
        return Promise.resolve(this.conversations);
    }

    getMessagesWithIdConversation(id: string): Promise<Message[]> {
        return Promise.resolve(this.messages.filter(msg => msg.id === id)
            .map(msg => msg.message));

    }

    sendMessage(id: string, mes: Message): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            const conversation = this.conversations.find(conv => conv.id === id);

            if (!conversation) {
                reject(new Error(`Conversation with id ${id} not found.`));
                return;
            }

            this.messages.push({ id, message: mes });

            conversation.lastMessage = mes;

            resolve();
        });
    }

}