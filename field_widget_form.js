/**
 * @file
 */

jQuery(document).ready(function () {
  var currentVersion = shStoryData['version'];
  var showArchivedStories = false;
  var $shorthandStoryDiv = jQuery('.field-name-shorthand-story-id');

  $shorthandStoryDiv.each(function () {
    var existingID = jQuery(this).find('input[type=text]').val();
    var foundValidStory = existingID ? false : true;
    if (jQuery(this).find('ul.stories')) {
      jQuery(this).append('<ul class="stories"></ul>');
      var list = jQuery(this).find('ul.stories');
      console.log(list);
      jQuery(this).append('<div class="clear"></div>');
      for (var shStory in shStoryData['stories']) {
        var data = shStoryData['stories'][shStory];
        var archivedMessage = '';
        if (shStoryData['version'] !== 'v2' && currentVersion === 'v2' && !showArchivedStories) {
          continue;
        }

        var serverURL = shStoryData['serverURL'];
        var imageURL = data.image;
        if (shStoryData['version'] !== 'v2') {
          imageURL = serverURL + data.image;
          if (currentVersion === 'v2') {
            archivedMessage = ' (archived)';
          }
        }

        var selected = '';
        var storySelected = '';
        if (existingID && existingID == data.id) {
          selected = 'checked';
          storySelected = 'selected';
          foundValidStory = true;
        }
        list.append('<li class="story ' + storySelected + '"><label><input name="story_id" type="radio" value="' + data.id + '" ' + selected + ' /><img width="150" src="' + imageURL + '" /><span>' + data.title + archivedMessage + '</span></a></label></li>');
      }
    }
    if (!foundValidStory) {
      jQuery(this).find('ul.stories').html('<div class="story_not_found"><h3>Could not find this story to edit, cannot update!  Updating disabled.</h3><p>Please check that you are using the correct API version, and that the story exists in Shorthand and try again.</p></div>');
      jQuery("#edit-submit").prop('disabled', true);
    }
  });

  jQuery('li.story input:radio').click(function () {
    jQuery('li.story').removeClass('selected');
    jQuery(this).parent().parent().addClass('selected');
    jQuery('label#title-prompt-text').text('');
    var input = jQuery(this).parent().parent().parent().parent().find('input[type=text]');
    input.val(jQuery(this).val());
    jQuery('input#edit-title').val(jQuery(this).parent().find('span').text());
  });
});
