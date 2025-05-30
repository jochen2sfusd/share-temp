document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const startConfessionBtn = document.getElementById('start-confession-btn');
    const homeView = document.getElementById('home-view');
    const helpView = document.getElementById('help-view');
    
    // Event listeners for the home page buttons
    if (startConfessionBtn) {
        startConfessionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Handle directly in JavaScript instead of relying on URL parameters
            // This ensures it works even if URL parameters aren't processed correctly
            
            // Create the confession view if not already created
            if (!document.getElementById('confession-view')) {
                const confessionView = document.createElement('section');
                confessionView.id = 'confession-view';
                confessionView.className = 'confession-view';
                confessionView.innerHTML = `
                    <div class="confession-header">
                        <h1 class="confession-title">向杂货铺老板倾诉</h1>
                        <p class="confession-subtitle">在这里分享你的困扰，收到回复时将通知你</p>
                    </div>
                    <div class="confession-form">
                        <div class="confession-image">
                            <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="信件">
                        </div>
                        <textarea placeholder="写下你的心事、困惑或者需要的帮助..."></textarea>
                        <div class="tag-selector">
                            <p>添加标签（可选）：</p>
                            <div class="tags">
                                <span class="tag">压力</span>
                                <span class="tag">焦虑</span>
                                <span class="tag">失眠</span>
                                <span class="tag">感情</span>
                                <span class="tag">工作</span>
                                <span class="tag">学业</span>
                            </div>
                        </div>
                        <div class="confession-options">
                            <div class="privacy-options">
                                <p>隐私设置：</p>
                                <div class="radio-options">
                                    <label class="radio-label">
                                        <input type="radio" name="privacy" value="public" checked>
                                        <span class="radio-custom"></span>
                                        <span>公开提问 (可被大家回答)</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="privacy" value="private">
                                        <span class="radio-custom"></span>
                                        <span>私密提问 (仅管理员可见)</span>
                                    </label>
                                </div>
                            </div>
                            <div class="notification-option">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="email-notification">
                                    <span class="checkbox-custom"></span>
                                    <span>有回复时通过邮件通知我</span>
                                </label>
                                <div class="email-input-container" style="display: none;">
                                    <input type="email" placeholder="请输入你的邮箱" class="email-input">
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="submit-confession-btn">
                                <i class="fas fa-paper-plane"></i> 发送
                            </button>
                        </div>
                    </div>`;
                
                // Insert the confession view after the home view
                homeView.parentNode.insertBefore(confessionView, homeView.nextSibling);
                
                // Add event listener to the submit button
                const submitConfessionBtn = document.querySelector('.submit-confession-btn');
                if (submitConfessionBtn) {
                    submitConfessionBtn.addEventListener('click', () => {
                        const confessionText = document.querySelector('.confession-form textarea').value.trim();
                        const emailNotification = document.getElementById('email-notification').checked;
                        const emailInput = document.querySelector('.email-input');
                        let validSubmission = true;
                        
                        if (!confessionText) {
                            alert('请先写下你的心事。');
                            validSubmission = false;
                        }
                        
                        if (emailNotification && emailInput && !emailInput.value.trim()) {
                            alert('请填写你的邮箱地址以接收通知。');
                            validSubmission = false;
                        }
                        
                        if (validSubmission) {
                            // Collect form data for submission
                            const privacyOption = document.querySelector('input[name="privacy"]:checked').value;
                            const selectedTags = Array.from(document.querySelectorAll('.tag.selected')).map(tag => tag.textContent);
                            const emailAddress = emailNotification && emailInput ? emailInput.value.trim() : '';
                            
                            // In a real app, this would send the data to a server
                            console.log({
                                confessionText,
                                privacyOption,
                                selectedTags,
                                emailNotification,
                                emailAddress
                            });
                            
                            // Generate a random access code
                            const accessCode = Math.floor(10000 + Math.random() * 90000);
                            
                            // Create confirmation view
                            const confirmationView = document.createElement('section');
                            confirmationView.id = 'confirmation-view';
                            confirmationView.className = 'confirmation-view';
                            
                            confirmationView.innerHTML = `
                                <div class="confirmation-container">
                                    <div class="confirmation-header">
                                        <div class="confirmation-icon">
                                            <i class="fas fa-paper-plane"></i>
                                        </div>
                                        <h1 class="confirmation-title">你的信件已成功发出！</h1>
                                        <p class="confirmation-message">我们已收到你的心事，将尽快给予回应</p>
                                    </div>
                                    
                                    <div class="confirmation-code-box">
                                        <div class="code-header">
                                            <div class="code-label">
                                                <i class="fas fa-key"></i>
                                                <span>你的信件访问码</span>
                                            </div>
                                        </div>
                                        <div class="access-code-container">
                                            <div class="access-code">
                                                <span id="access-code-value">#${accessCode}</span>
                                            </div>
                                            <button id="copy-code-btn" class="copy-btn" title="复制访问码">
                                                <i class="far fa-copy"></i> 复制访问码
                                            </button>
                                        </div>
                                        <p class="code-info">请保存此访问码，用于以后查看回复</p>
                                    </div>
                                    
                                    <div class="confirmation-divider"></div>
                                    
                                    <div class="email-notification-section ${emailAddress ? 'with-email' : ''}">
                                        ${emailAddress ? `
                                        <div class="email-confirmed">
                                            <div class="email-icon">
                                                <i class="fas fa-envelope-open-text"></i>
                                            </div>
                                            <div class="email-content">
                                                <h3>邮件提醒已开启</h3>
                                                <p>有新回复时，我们会通知到：<strong>${emailAddress}</strong></p>
                                            </div>
                                        </div>` : `
                                        <div class="email-notification-box">
                                            <div class="email-icon">
                                                <i class="fas fa-bell"></i>
                                            </div>
                                            <div class="email-content">
                                                <h3>开启邮件提醒</h3>
                                                <p>当有人回复你的信件时，我们会发送邮件通知你</p>
                                                <div class="email-form">
                                                    <input type="email" id="confirmation-email" placeholder="请输入你的邮箱" value="${emailAddress}">
                                                    <button id="save-email-btn" class="primary-btn">
                                                        <i class="fas fa-bell"></i> 开启通知
                                                    </button>
                                                </div>
                                            </div>
                                        </div>`}
                                    </div>
                                    
                                    <div class="confirmation-actions">
                                        <button id="back-to-home-btn" class="secondary-btn">
                                            <i class="fas fa-home"></i> 返回首页
                                        </button>
                                        <button id="view-message-btn" class="primary-btn">
                                            <i class="fas fa-eye"></i> 查看我的信件
                                        </button>
                                    </div>
                                </div>
                            `;
                            
                            // Replace the confession view with confirmation view
                            const confessionView = document.getElementById('confession-view');
                            confessionView.parentNode.replaceChild(confirmationView, confessionView);
                            
                            // Add event listeners for the confirmation page buttons
                            const copyCodeBtn = document.getElementById('copy-code-btn');
                            if (copyCodeBtn) {
                                copyCodeBtn.addEventListener('click', () => {
                                    const accessCodeValue = document.getElementById('access-code-value').textContent;
                                    
                                    // Check if the Clipboard API is available
                                    if (navigator.clipboard) {
                                        navigator.clipboard.writeText(accessCodeValue)
                                            .then(() => {
                                                // Success feedback
                                                copyCodeBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
                                                copyCodeBtn.classList.add('copied');
                                                setTimeout(() => {
                                                    copyCodeBtn.innerHTML = '<i class="far fa-copy"></i> 复制访问码';
                                                    copyCodeBtn.classList.remove('copied');
                                                }, 2000);
                                            })
                                            .catch(err => {
                                                // Fallback for clipboard write failure
                                                console.error('无法复制文本: ', err);
                                                fallbackCopyTextToClipboard(accessCodeValue, copyCodeBtn);
                                            });
                                    } else {
                                        // Fallback for browsers that don't support clipboard API
                                        fallbackCopyTextToClipboard(accessCodeValue, copyCodeBtn);
                                    }
                                });
                                
                                // Fallback copy function using older methods
                                function fallbackCopyTextToClipboard(text, button) {
                                    const textArea = document.createElement("textarea");
                                    textArea.value = text;
                                    
                                    // Make the textarea out of viewport
                                    textArea.style.position = "fixed";
                                    textArea.style.left = "-999999px";
                                    textArea.style.top = "-999999px";
                                    document.body.appendChild(textArea);
                                    textArea.focus();
                                    textArea.select();
                                    
                                    try {
                                        const successful = document.execCommand('copy');
                                        if (successful) {
                                            button.innerHTML = '<i class="fas fa-check"></i> 已复制';
                                            button.classList.add('copied');
                                            setTimeout(() => {
                                                button.innerHTML = '<i class="far fa-copy"></i> 复制访问码';
                                                button.classList.remove('copied');
                                            }, 2000);
                                        } else {
                                            alert('无法复制访问码，请手动复制: ' + text);
                                        }
                                    } catch (err) {
                                        console.error('无法复制文本: ', err);
                                        alert('无法复制访问码，请手动复制: ' + text);
                                    }
                                    
                                    document.body.removeChild(textArea);
                                }
                            }
                            
                            const saveEmailBtn = document.getElementById('save-email-btn');
                            if (saveEmailBtn) {
                                saveEmailBtn.addEventListener('click', () => {
                                    const confirmationEmail = document.getElementById('confirmation-email').value.trim();
                                    if (confirmationEmail) {
                                        // Validate email format
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        if (emailRegex.test(confirmationEmail)) {
                                            // In a real app, this would send the email to the server
                                            console.log('Email saved for notifications:', confirmationEmail);
                                            
                                            // Show loading state
                                            saveEmailBtn.disabled = true;
                                            saveEmailBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 保存中...';
                                            
                                            // Simulate network request
                                            setTimeout(() => {
                                                // Replace the email notification box with confirmation
                                                const emailNotificationSection = document.querySelector('.email-notification-section');
                                                emailNotificationSection.innerHTML = `
                                                    <div class="email-confirmed">
                                                        <div class="email-icon">
                                                            <i class="fas fa-envelope-open-text"></i>
                                                        </div>
                                                        <div class="email-content">
                                                            <h3>邮件提醒已开启</h3>
                                                            <p>有新回复时，我们会通知到：<strong>${confirmationEmail}</strong></p>
                                                        </div>
                                                    </div>
                                                `;
                                                emailNotificationSection.classList.add('with-email');
                                            }, 1000);
                                        } else {
                                            // Invalid email format
                                            const emailInput = document.getElementById('confirmation-email');
                                            emailInput.classList.add('error');
                                            
                                            // Show error message
                                            const errorMsg = document.createElement('p');
                                            errorMsg.className = 'email-error-msg';
                                            errorMsg.innerHTML = '请输入有效的邮箱地址';
                                            
                                            // Check if error message already exists
                                            const existingError = document.querySelector('.email-error-msg');
                                            if (!existingError) {
                                                emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);
                                            }
                                            
                                            // Focus the input for correction
                                            emailInput.focus();
                                            
                                            // Remove error styling when user types
                                            emailInput.addEventListener('input', function() {
                                                this.classList.remove('error');
                                                const errorMsg = document.querySelector('.email-error-msg');
                                                if (errorMsg) {
                                                    errorMsg.remove();
                                                }
                                            }, { once: true });
                                        }
                                    } else {
                                        alert('请输入有效的邮箱地址');
                                    }
                                });
                            }
                            
                            const backToHomeBtn = document.getElementById('back-to-home-btn');
                            if (backToHomeBtn) {
                                backToHomeBtn.addEventListener('click', () => {
                                    window.location.href = './';
                                });
                            }
                            
                            const viewMessageBtn = document.getElementById('view-message-btn');
                            if (viewMessageBtn) {
                                viewMessageBtn.addEventListener('click', () => {
                                    // In a real app, this would navigate to the message view page with the access code
                                    alert('查看信件功能正在开发中，敬请期待！');
                                });
                            }
                        }
                    });
                }
                
                // Add event listeners for tag selection
                const tags = document.querySelectorAll('.tag');
                if (tags.length > 0) {
                    tags.forEach(tag => {
                        tag.addEventListener('click', () => {
                            tag.classList.toggle('selected');
                        });
                    });
                }
                
                // Add event listener for email notification checkbox
                const emailNotificationCheckbox = document.getElementById('email-notification');
                const emailInputContainer = document.querySelector('.email-input-container');
                
                if (emailNotificationCheckbox && emailInputContainer) {
                    emailNotificationCheckbox.addEventListener('change', () => {
                        emailInputContainer.style.display = emailNotificationCheckbox.checked ? 'block' : 'none';
                    });
                }
            }
            
            // Hide home view and show confession view
            homeView.classList.add('hidden');
            document.getElementById('confession-view').classList.remove('hidden');
            
            // Update the URL without refreshing the page to help with navigation
            history.pushState({}, '', 'index.html?view=confession');
        });
    }
    
    // Help page specific functionality
    const replyTextarea = document.querySelector('.reply-area textarea');
    const submitReplyBtn = document.querySelector('.submit-reply-btn');
    const emojiButtons = document.querySelectorAll('.emoji-btn');
    
    if (replyTextarea && submitReplyBtn) {
        // Adding placeholder emojis on emoji button clicks
        emojiButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const emoji = btn.querySelector('i').classList.contains('fa-heart') ? '❤️' :
                              btn.querySelector('i').classList.contains('fa-smile') ? '😊' :
                              btn.querySelector('i').classList.contains('fa-smile-beam') ? '😁' :
                              btn.querySelector('i').classList.contains('fa-grin') ? '😄' : '⭐';
                
                replyTextarea.value += ` ${emoji} `;
                replyTextarea.focus();
            });
        });
        
        // Handle reply submission
        submitReplyBtn.addEventListener('click', () => {
            const replyText = replyTextarea.value.trim();
            
            if (replyText) {
                // In a real app, this would send the reply to a server
                alert('感谢你的回应！你的温暖将传递给需要帮助的人。');
                replyTextarea.value = '';
                
                // Simulate success by updating the stats (in a real app, this would be done after server confirmation)
                updateHelperStats();
            } else {
                alert('请先写下你的建议和鼓励。');
            }
        });
    }
    
    // Function to update the helper stats
    function updateHelperStats() {
        const todayHelped = document.querySelector('.help-stats .stat-item:nth-child(1)');
        if (todayHelped) {
            const currentCount = parseInt(todayHelped.textContent.match(/\d+/)[0]);
            todayHelped.innerHTML = `<i class="fas fa-heart"></i> 今日已帮助: ${currentCount + 1}人`;
        }
        
        const totalHelped = document.querySelector('.help-stats .stat-item:nth-child(2)');
        if (totalHelped) {
            const currentCount = parseInt(totalHelped.textContent.match(/\d+/)[0]);
            totalHelped.innerHTML = `<i class="fas fa-users"></i> 累计帮助: ${currentCount + 1}人`;
        }
    }
    
    // Handle URL parameters to potentially show different views
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    
    // This would be used if we want to control views with URL parameters
    if (view === 'help' && homeView && helpView) {
        homeView.classList.add('hidden');
        helpView.classList.remove('hidden');
    } else if (view === 'confession' && homeView && !document.getElementById('confession-view')) {
        // If we're loading the page with the confession view parameter,
        // trigger the button click to handle the view creation and display
        if (startConfessionBtn) {
            startConfessionBtn.click();
        }
    }
}); 