var addComment = {
  moveForm: function( commId, parentId, respondId, postId ) {
    var div, element, style, cssHidden,
      t           = this,
      comm        = t.I( commId ),
      respond     = t.I( respondId ),
      cancel      = t.I( 'cancel-comment-reply-link' ),
      parent      = t.I( 'comment_parent' ),
      post        = t.I( 'comment_post_ID' ),
      commentForm = respond.getElementsByTagName( 'form' )[0];

    if ( ! comm || ! respond || ! cancel || ! parent || ! commentForm ) {
      return;
    }

    t.respondId = respondId;
    postId = postId || false;

    if ( ! t.I( 'wp-temp-form-div' ) ) {
      div = document.createElement( 'div' );
      div.id = 'wp-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore( div, respond );
    }

    comm.insertBefore( respond, comm.children['2'] );
    if ( post && postId ) {
      post.value = postId;
    }
    parent.value = parentId;
    cancel.style.display = '';

    cancel.onclick = function() {
      var t       = addComment,
        temp    = t.I( 'wp-temp-form-div' ),
        respond = t.I( t.respondId );

      if ( ! temp || ! respond ) {
        return;
      }

      t.I( 'comment_parent' ).value = '0';
      temp.parentNode.insertBefore( respond, temp );
      temp.parentNode.removeChild( temp );
      this.style.display = 'none';
      this.onclick = null;
      return false;
    };

    /*
     * Set initial focus to the first form focusable element.
     * Try/catch used just to avoid errors in IE 7- which return visibility
     * 'inherit' when the visibility value is inherited from an ancestor.
     */
    try {
      for ( var i = 0; i < commentForm.elements.length; i++ ) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ( 'getComputedStyle' in window ) {
          style = window.getComputedStyle( element );
          // IE 8.
        } else if ( document.documentElement.currentStyle ) {
          style = element.currentStyle;
        }

        /*
         * For display none, do the same thing jQuery does. For visibility,
         * check the element computed style since browsers are already doing
         * the job for us. In fact, the visibility computed style is the actual
         * computed value and already takes into account the element ancestors.
         */
        if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ( 'hidden' === element.type || element.disabled || cssHidden ) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }

    } catch( er ) {}

    return false;
  },

  I: function( id ) {
    return document.getElementById( id );
  }
};

/**************************************************************
 * Edit posted content
 **************************************************************/

var editContent = {
  edit: function( commId, parentId, editId, postId ) {
    var div, element, style, cssHidden,
      t           = this,
      comm        = t.I( commId ), // Whole comment inc container
      edit     	= t.I( editId ),
      parent      = t.I( 'comment_parent' ),
      post        = t.I( 'comment_post_ID' );

    commentContainer = comm.getElementsByClassName('mca-author')[0],
      reply_author = comm.getElementsByClassName('reply-author')[0],
      commentContainerBefore = comm.getElementsByClassName('comment-text')[0];

    commentText = commentContainer.innerText;

    t.editId = editId;
    if(reply_author) {
      reply_author.style.display = 'none';
    }

    editInner = `<form id="editForm" class="comment-form row collapse" novalidate="">
		    <div class="columns" data-equalizer-watch="">
				<div class="comment-form-comment small-12 columns" data-equalizer-watch="">
					<textarea id="edit-comment" name="comment" aria-required="true">${commentText}</textarea>
				</div>
				<p class="form-submit"></p>
				<div class="save-changes-cont">
				<h6 id="reply-title">
					<small><a rel="nofollow" id="cancel-comment-edit-link" href="/blockgeeks/www/awesome-2/#respond">Cancel changes</a></small>
				</h6>
				<div class="save-changes">
					<div>
						<input name="submit" type="submit" id="submit" class="submit button small secondary	float-right reply" value="Save changes">
					</div>
					</div>
				</div>
				<input type="hidden" name="comment_post_ID" value="$(postId}" id="comment_post_ID">
				<input type="hidden" name="comment_parent" id="comment_parent" value="$(postId}">
				<input type="hidden" id="_wp_unfiltered_html_comment_disabled" name="_wp_unfiltered_html_comment" value="1734f5b216">
				<script>(function(){if(window===window.parent){document.getElementById('_wp_unfiltered_html_comment_disabled').name='_wp_unfiltered_html_comment';}})();</script>
			</div>
		</form>`;

    editEle = document.createElement('div');
    editEle.id = "edit";
    editEle.class = "comment-respond";
    editEle.innerHTML = editInner;

    postId = postId || false;

    if ( ! edit ) {
      // div = document.createElement( 'div' );
      // div.id = 'wp-temp-form-edit-div';
      // div.style.display = 'none';
    } else { // IF there is a current edit remove it

      edit.parentNode.removeChild(edit);
      // comm.childNodes[3].childNodes[1].removeChild( editEle );
      var comment = document.getElementsByClassName("mca-author");
      for(var i = 0; i < comment.length; i++)
      {
        comment[i].style.display = 'block';
      }

    }

    commentContainerBefore.insertBefore( editEle, commentContainer );
    cancel = t.I( 'cancel-comment-edit-link' );
    form = t.I('editForm');
    commentForm = editEle.getElementsByTagName( 'form' )[0];
    commentContainer.style.display = 'none';
    if ( post && postId ) {
      post.value = postId;
    }
    parent.value = parentId;
    cancel.style.display = 'inline';

    cancel.onclick = function() {
      if(reply_author) {
        reply_author.style.display = 'inline';
      }
      t.I( 'comment_parent' ).value = '0';
      commentContainerBefore.removeChild( editEle );
      commentContainer.style.display = 'block';
      this.style.display = 'none';
      this.onclick = null;
      return false;
    };

    form.onsubmit = function(event){
      event.preventDefault();
      var data = {
        action: 'update_comment',
        content: t.I('edit-comment').value,
        id: parentId,
      };
      $.post(ajax_object.ajax_url, data, function(response) {
      }).done(function(response) {
        if(reply_author) {
          reply_author.style.display = 'inline';
        }
        commentContainer.innerText = t.I('edit-comment').value;
        editEle.parentNode.removeChild(editEle);
        commentContainer.style.display = 'block';
      }).fail(function(response) {
      });
    }

    try {
      for ( var i = 0; i < commentForm.elements.length; i++ ) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ( 'getComputedStyle' in window ) {
          style = window.getComputedStyle( element );
          // IE 8.
        } else if ( document.documentElement.currentStyle ) {
          style = element.currentStyle;
        }

        if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ( 'hidden' === element.type || element.disabled || cssHidden ) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }

    } catch( er ) {}

    return false;
  },

  I: function( id ) {
    return document.getElementById( id );
  }
}