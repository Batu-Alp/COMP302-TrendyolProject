import {
    parseRequestUrl,
    showLoading,
    hideLoading,
    showMessage,
    rerender,
  } from '../utils';
  import { createSupport, getSupport } from '../api';
  import { getUserInfo } from '../localStorage';
  

  const CustomerSupportScreen = {
    after_render: () => {
      const request = parseRequestUrl();
      if (document.getElementById('review-form')) {
        document.getElementById('review-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          showLoading();

          const comment = document.getElementById('comment').value;
          const name = document.getElementById('user-name').textContent;

          if (comment.trim() === '') {
            showMessage('Please enter a valid comment.'); // Geçerli bir yorum girilmediğinde mesaj gösterme
            return;
          }
  
          //const support = await createSupport(comment);
          //const support = await createSupport(request.id, {comment, name,});
          const support = await createSupport({comment, name,});

          hideLoading();

          console.log("comment : ", comment);
          console.log("name : ", name);
          console.log("after render : ", request.id);
          showMessage('Support request sent successfully.')

          /*
          if (support.error) {
            showMessage('Support request sent successfully.', () => {
            });
          } else {
            showMessage('Failed to send support request.');
            console.log("support.error : ", support.error.name);
          }
          */
        });
      }
    },
  
    render: async () => {
      const request = parseRequestUrl();
      
     
      
      const userInfo = getUserInfo();
      console.log("render : ", request.id);
      
      return `
        <div class="content">
          <div class="back-to-result">
            <a href="/#/">Back to shopping</a>
          </div>
  
          <div class="content">
            <ul class="review">
              <li>
                ${
                  userInfo.name
                    ? `
                    <div class="form-container">
                      <form id="review-form">
                        <ul class="form-items">
                          <li><h3>Write a message</h3></li>
                          <li>
                            <label for="comment">Comment</label>
                            <p id = "user-name">${userInfo.name}</p>
                            <textarea required name="comment" id="comment"></textarea>
                          </li>
                          <li>
                            <button type="submit" class="primary">Submit</button>
                          </li>
                        </ul>
                      </form>
                    </div>`
                    : `
                    <div>
                      Please <a href="/#/signin">Sign in</a> to write a support request.
                    </div>`
                }
              </li>
            </ul>
          </div>
        </div>
      `;
    },
  };
  
  export default CustomerSupportScreen;
  /*
  const CustomerSupportScreen = {
    after_render: () => {
      const request = parseRequestUrl();
  
      if (document.getElementById('review-form')) {
        document
          .getElementById('review-form')
          .addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await createSupport({
              comment: document.getElementById('comment').value,
            });
         
            hideLoading();
            showMessage('Review Added Successfully', () => {
              rerender(CustomerSupportScreen);
            });
            
            if (data.error) {
              showMessage(data.error);
            } else {
              showMessage('Review Added Successfully', () => {
                rerender(CustomerSupportScreen);
              });
            }
            
          });
      }
      },

     
    
  
    render: async () => {
      const request = parseRequestUrl();
 
      showLoading();
      hideLoading();
      const userInfo = getUserInfo();
      return `
      <div class="content">
        <div class="back-to-result">
        <!--
        <form action="/#/">
        <button class="back-button">
        <i class="fa fa-arrow-left"></i>
        Back to shopping
         </button>
        </form>  
        -->
        <a href="/#/" >
        <i class="fa fa-arrow-left"></i>
        Back to shopping 
        </a>
  
        </div>
  
        <div class="content">
        <ul class="review">
      
          <li>
         
          ${
            userInfo.name
              ? `
              <div class="form-container">
              <form id="review-form">
                <ul class="form-items">
                <li> <h3>Write a message</h3></li>
                  <li>
                    <label for="comment">Comment</label>
                    <textarea required  name="comment" id="comment" ></textarea>
                  </li>
                  <li>
                    <button type="submit" class="primary">Submit</button>
                  </li>
                </ul>
              </form>
              </div>`
              : ` <div>
                Please <a href="/#/signin">Signin</a> to write a review.
              </div>`
          }
        </li>
      </ul> 
  
        </div>
      </div>`;
    },
  };
  export default CustomerSupportScreen;
  */
  